const { defineConfig } = require("cypress");

module.exports = defineConfig({
  allowCypressEnv: false,
  e2e: {
    video: true,
    videosFolder: 'cypress/videos',
    screenshotsFolder: 'cypress/screenshots',
    supportFile: 'cypress/support/e2e.js',
    scrollBehavior: 'center',
    reporter: 'cypress-mochawesome-reporter',

    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on);

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
      return config;
    },
  },
});
