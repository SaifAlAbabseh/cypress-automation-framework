import './commands';
import 'cypress-mochawesome-reporter/register';
import 'cypress-xpath';

const env = {
    baseUrl: 'https://all-chat.alwaysdata.net/'
};

beforeEach(() => {
  cy.visit(env.baseUrl)
});