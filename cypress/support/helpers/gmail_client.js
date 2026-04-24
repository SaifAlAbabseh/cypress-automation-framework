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
      },
    };
  }

  async connect() {
    this.connection = await imaps.connect(this.config);
    await this.connection.openBox('INBOX');
  }

  async getLatestEmail() {
    await this.connect();

    const messages = await this.connection.search(['ALL'], {
      bodies: [''],
      markSeen: false,
    });

    if (!messages.length) {
      throw new Error('No emails found');
    }

    const latest = messages[messages.length - 1];
    const all = latest.parts[0].body;

    const parsed = await simpleParser(all);

    return {
      subject: parsed.subject,
      from: parsed.from?.text,
      text: parsed.text,
      html: parsed.html,
    };
  }

  async findEmailBySubject(keyword) {
    await this.connect();

    const messages = await this.connection.search(['ALL'], {
      bodies: [''],
    });

    for (let i = messages.length - 1; i >= 0; i--) {
      const all = messages[i].parts[0].body;
      const parsed = await simpleParser(all);

      if (parsed.subject?.includes(keyword)) {
        return {
          subject: parsed.subject,
          text: parsed.text,
          html: parsed.html,
        };
      }
    }

    throw new Error(`No email found with subject: ${keyword}`);
  }
}

module.exports = GmailClient;