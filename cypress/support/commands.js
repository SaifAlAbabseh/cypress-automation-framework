Cypress.Commands.overwrite('type', (originalFn, subject, text, options) => {
  const customOptions = { delay: 200, ...options };
  return originalFn(subject, text, customOptions);
});

Cypress.Commands.add('clickWithRetry', { prevSubject: 'element' }, (subject, maxRetries = 5) => {
  let attempts = 0;
  
  const click = () => {
    cy.wrap(subject)
      .should('exist')
      .click({ force: true, multiple: false })
      .then(() => {
        cy.log(`Element clicked successfully on attempt ${attempts + 1}`);
      });
  };
  
  click();
});