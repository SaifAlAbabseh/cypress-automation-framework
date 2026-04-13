import '../commands';

class ActionsPage {

    get emailField() { return cy.get('#email1'); }
    get actionCanvasField() { return cy.get('#action-canvas'); } 

    typeEmail(email) {
        return this.emailField.type(email, { delay: 100 });
    }

    clickOnCanvas(x, y) {
        return this.actionCanvasField.click(x, y);
    }
}

export default new ActionsPage();