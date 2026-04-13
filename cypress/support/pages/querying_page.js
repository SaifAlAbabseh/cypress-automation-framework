import '../commands';

class QueryingPage {

    queryButton = '#query-btn';
    queryForm = 'form.query-form';

    get queryBtn() { return cy.get(this.queryButton); }
    get queryFormField() { return cy.get(this.queryForm); }

    clickBtn() {
        return this.queryBtn.click();
    }

    typeInForm(firstName, lastName) {
        return this.queryFormField.wait(200).within(() => {
            cy.get('input:first').type(firstName, { delay: 100 })
            cy.get('input:last').type(lastName, { delay: 100 })
        })
    }
}

export default new QueryingPage();