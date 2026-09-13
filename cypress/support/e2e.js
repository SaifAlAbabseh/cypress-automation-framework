import './commands';
import 'cypress-mochawesome-reporter/register';
import 'cypress-xpath';

const projectBaseUrls = {
  staging: {
    all_chat_project: 'http://localhost/All-Chat-web-app/',
    other_project: 'https://your-other-project-url.com/' // Update with actual URL
  },
  prod: {
    all_chat_project: 'https://all-chat.alwaysdata.net/',
    other_project: 'https://your-other-project-url.com/' // Update with actual URL
  }
};

beforeEach(() => {
  const projectName = Cypress.expose('projectName');
  const env = Cypress.expose('environment');
  const baseUrl = projectBaseUrls[env][projectName];
  
  Cypress.expose('baseUrl', baseUrl);

  cy.session(`login-${projectName}-${env}`, () => {
    cy.visit(baseUrl);
    const authModule = require('./pages/' + projectName + '/auth/auth.js');
    authModule.loginToSite();
  });
});