import testData from '../../fixtures/test_data/all_chat_test_data.json'
import mainPage from '../../support/pages/all_chat_project/main_page'
import profilePage from '../../support/pages/all_chat_project/profile_page'

const password = testData.password
const newPassword = testData.new_password

describe('Change Password Test Suite', () => {

    beforeEach(() => {
        mainPage.navigateToMainPage()
    })

    it('Successful Password Change Test', () => {
        mainPage.handleMobileMenu(true)
        mainPage.clickOnEditProfileButton()
        profilePage.clickOnChangePasswordButton()
        profilePage.typeCurrentPassword(password)
        profilePage.typeNewPassword(newPassword)
        profilePage.typeConfirmNewPassword(newPassword)
        profilePage.submitNewPassword()
        cy.contains('Successfully changed password :)').should('be.visible')
    })
})