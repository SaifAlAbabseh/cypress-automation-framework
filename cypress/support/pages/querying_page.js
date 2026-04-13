import '../commands'

export const selectors = {
    clickBtn: () => {
        return cy.get('#query-btn').click()
    },
    typeInForm: (firstName, lastName) => {
        return cy.get('form.query-form').wait(200).within(() => {
            cy.get('input:first').type(firstName, { delay: 100 })
            cy.get('input:last').type(lastName, { delay: 100 })
        })
    }
}