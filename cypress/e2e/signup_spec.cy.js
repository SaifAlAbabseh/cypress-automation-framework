import loginPage from '../support/pages/login_page'

describe('Signup Test Suite', () => {

    beforeEach(() => {
        loginPage.clickOnPopUpExitButton()
    })

    it('Valid Signup Test', () => {
        loginPage.clickOnSignupSwitcherButton()
        loginPage.getSignupEmailField.should('be.visible')
    })
})