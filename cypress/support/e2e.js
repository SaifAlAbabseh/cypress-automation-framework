import './commands';
import 'cypress-mochawesome-reporter/register';

const env = {
    baseUrl: 'https://example.cypress.io'
};

beforeEach(() => {
  cy.visit(env.baseUrl)
});