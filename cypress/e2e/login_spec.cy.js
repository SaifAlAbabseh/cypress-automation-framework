import testData from '../fixtures/test_data/all_chat_test_data.json'
import loginPage from '../support/pages/login_page'
import mainPage from '../support/pages/main_page'

const username = testData.username
const password = testData.password

describe('Login Test Suite', () => {

    beforeEach(() => {
        loginPage.clickOnPopUpExitButton()
    })

    it('Valid Login Test', () => {
        loginPage.typeInUsernameInputField(username)
        loginPage.typeInPasswordInputField(password)
        loginPage.clickOnLoginButton()
        mainPage.handleMobileMenu(true)
        mainPage.verifyUsername(username)
    })

    it('User Switches From Signup To Login', () => {
        loginPage.clickOnSignupSwitcherButton()
        loginPage.clickOnLoginSwitcherButton()
        loginPage.login(username, password)
        mainPage.handleMobileMenu(true)
        mainPage.verifyUsername(username)
    })
})