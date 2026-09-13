import mainPage from '../../support/pages/all_chat_project/main_page'
import profilePage from '../../support/pages/all_chat_project/profile_page'

describe('Edit Profile Picture Test Suite', () => {

    beforeEach(() => {
        mainPage.navigateToMainPage()
    })

    it('Successful Edit Profile Picture Test', () => {
        mainPage.handleMobileMenu(true)
        mainPage.clickOnEditProfileButton()
        profilePage.clickOnChangePictureButton()
        cy.fixture('images/test_image.png', null).as('profilePicture')
        profilePage.uploadPicture('@profilePicture')
        profilePage.clickProfilePictureSubmitButton()
        profilePage.returnSubmitPictureMessage().should('include', 'Successfully Changed')
    })
})