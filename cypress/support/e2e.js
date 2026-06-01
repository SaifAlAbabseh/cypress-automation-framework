import './commands';
import 'cypress-mochawesome-reporter/register';
import 'cypress-xpath';

const projectBaseUrls = {
  all_chat_project: 'http://localhost/All-Chat-web-app/',
  other_project: 'https://your-other-project-url.com/' // Update with actual URL
};

beforeEach(() => {
  // Get project name from npm command environment variable
  const projectName = Cypress.expose('projectName');
  const baseUrl = projectBaseUrls[projectName];
  
  cy.visit(baseUrl);
});