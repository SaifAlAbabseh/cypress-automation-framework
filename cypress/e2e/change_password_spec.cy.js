import testData from '../fixtures/test_data/all_chat_test_data.json'
import loginPage from '../support/pages/login_page'
import mainPage from '../support/pages/main_page'
import profilePage from '../support/pages/profile_page'

const username = testData.username
const password = testData.password
const newPassword = testData.new_password

describe('Change Password Test Suite', () => {

    beforeEach(() => {
        loginPage.clickOnPopUpExitButton()
    })

    it('Successful Password Change Test', () => {
        loginPage.login(username, password)
        mainPage.handleMobileMenu(true)
        mainPage.verifyUsername(username)
        mainPage.clickOnEditProfileButton()
        profilePage.clickOnChangePasswordButton()
        profilePage.typeCurrentPassword(password)
        profilePage.typeNewPassword(newPassword)
        profilePage.typeConfirmNewPassword(newPassword)
        profilePage.submitNewPassword()
        cy.on('window:alert', (alertText) => {
            expect(alertText).to.equal('Successfully changed password :)')
        })
    })
})