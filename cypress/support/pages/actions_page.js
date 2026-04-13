import '../commands';

export const selectors = {
    typeEmail: (email) => {
        return cy.get('#email1').type(email, { delay: 100 })
    },
    clickOnCanvas: (x, y) => {
        return cy.get('#action-canvas').click(x, y)
    }
}