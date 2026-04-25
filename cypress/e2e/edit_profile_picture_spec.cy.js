import testData from '../fixtures/test_data/all_chat_test_data.json'
import loginPage from '../support/pages/login_page'
import mainPage from '../support/pages/main_page'
import profilePage from '../support/pages/profile_page'

const username = testData.username
const password = testData.password

describe('Edit Profile Picture Test Suite', () => {

    beforeEach(() => {
        loginPage.clickOnPopUpExitButton()
    })

    it('Successful Edit Profile Picture Test', () => {
        loginPage.login(username, password)
        mainPage.handleMobileMenu(true)
        mainPage.verifyUsername(username)
        mainPage.clickOnEditProfileButton()
        profilePage.clickOnChangePictureButton()
        cy.fixture('images/test_image.png', null).as('profilePicture')
        profilePage.uploadPicture('@profilePicture')
        profilePage.clickProfilePictureSubmitButton()
        profilePage.returnSubmitPictureMessage().should('include', 'Successfully Changed')
    })
})