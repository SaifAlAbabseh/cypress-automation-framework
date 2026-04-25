const imaps = require('imap-simple');
const { simpleParser } = require('mailparser');

class GmailClient {
  constructor({ user, password }) {
    this.config = {
      imap: {
        user,
        password,
        host: 'imap.gmail.com',
        port: 993,
        tls: true,
        authTimeout: 10000,
        tlsOptions: {
          rejectUnauthorized: false,
        },
      },
    };
  }

  async connect() {
    if (this.connection) return;

    this.connection = await imaps.connect(this.config);
    await this.connection.openBox('INBOX');
  }

  async disconnect() {
    if (this.connection) {
      this.connection.end();
      this.connection = null;
    }
  }

  async findEmailBySubject(keyword, options = {}) {
    const {
      timeout = 20000,   // max wait time
      interval = 3000,   // retry every 3s
      lastEmails = 10    // only check recent emails
    } = options;

    await this.connect();

    const start = Date.now();

    while (Date.now() - start < timeout) {

      // 🔍 only search recent emails (faster)
      const messages = await this.connection.search(['ALL'], {
        bodies: [''],
        markSeen: false,
      });

      const recent = messages.slice(-lastEmails);

      for (let i = recent.length - 1; i >= 0; i--) {
        const all = recent[i].parts[0].body;
        const parsed = await simpleParser(all);

        if (parsed.subject?.includes(keyword)) {
          await this.disconnect();

          return {
            subject: parsed.subject,
            from: parsed.from?.text,
            text: parsed.text,
            html: parsed.html,
          };
        }
      }

      // ⏳ wait before retry
      await new Promise((res) => setTimeout(res, interval));
    }

    await this.disconnect();
    throw new Error(`Email with subject "${keyword}" not received within ${timeout}ms`);
  }
}

module.exports = GmailClient;