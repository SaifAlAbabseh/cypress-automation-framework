Cypress.Commands.overwrite('type', (originalFn, subject, text, options) => {
  const customOptions = { delay: 200, ...options };
  return originalFn(subject, text, customOptions);
})