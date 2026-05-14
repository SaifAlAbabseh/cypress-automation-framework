import loginPage from '../../support/pages/all_chat_project/login_page'

describe('Signup Test Suite', () => {

    beforeEach(() => {
        loginPage.clickOnPopUpExitButton()
    })

    it('Valid Signup Test', () => {
        loginPage.clickOnSignupSwitcherButton()
        loginPage.getSignupEmailField.should('be.visible')
    })
})