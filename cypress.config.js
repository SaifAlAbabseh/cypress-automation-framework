const { defineConfig } = require("cypress");
const GmailClient = require('./cypress/support/helpers/gmail_client');
import gmail_data from './cypress/fixtures/test_data/secret_data/gmail_client_data.json';

module.exports = defineConfig({
  allowCypressEnv: false,
  e2e: {
    defaultCommandTimeout: 10000,
    video: true,
    videoCompression: 0,
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    supportFile: 'cypress/support/e2e.js',
    scrollBehavior: 'center',

    setupNodeEvents(on, config) {

      // Gmail Client Configuration
      const gmail = new GmailClient({
        user: gmail_data.email,
        password: gmail_data.app_password,
      });
      on('task', {
        getEmailBySubject({ subject, timeout, interval }) {
          return gmail.findEmailBySubject(subject, { timeout, interval });
        }
      });
      //////////////////////////////////////////////


      // Handle Mochawesome reporter configuration
      if (config.reporter === 'cypress-mochawesome-reporter') {
        config.reporterOptions = {
          saveJson: true,
        };
        require('cypress-mochawesome-reporter/plugin')(on);
      }
      //////////////////////////////////////////////


      // Set viewport based on the device type specified in environment variables
      const device = config.env.device;
      if (device === 'mobile') {
        config.viewportWidth = 500;
        config.viewportHeight = 900;
      } else if (device === 'tablet') {
        config.viewportWidth = 768;
        config.viewportHeight = 1024;
      } else {
        // Default desktop values
        config.viewportWidth = 1920;
        config.viewportHeight = 1080;
      }
      //////////////////////////////////////////////
      

      return config;
    },
  },
});
