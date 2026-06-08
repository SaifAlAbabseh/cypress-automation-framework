import testData from '../../fixtures/test_data/all_chat_test_data.json'
import loginPage from '../../support/pages/all_chat_project/login_page'
import mainPage from '../../support/pages/all_chat_project/main_page'
import groupChatPage from '../../support/pages/all_chat_project/group_chat_page'
import { generateRandomString } from '../../support/helpers/main_helpers'

const username = testData.username
const password = testData.password
const groupName = generateRandomString(8)

describe('Create Chat Group Test Suite', () => {

    beforeEach(() => {
        loginPage.clickOnPopUpExitButton()
        loginPage.login(username, password)
        mainPage.handleMobileMenu(true)
    })

    it('Create Group Chat Test', () => {
        mainPage.clickOnCreateGroupButton()
        cy.fixture('images/test_image.png', null).as('profilePicture')
        mainPage.typeGroupInfo(groupName, '@profilePicture')
        mainPage.clickOnCreateGroupSubmitButton()
        mainPage.verifyGroupHasBeenCreated(groupName)
    })

    it('Delete Chat Group Test', () => {
        mainPage.clickOnGroupEnterButton(groupName)
        groupChatPage.clickOnGroupSettingsButton()
        groupChatPage.clickOnDestroyGroupButton()
        groupChatPage.confirmGroupDestruction()
        mainPage.verifyGroupHasBeenDeleted(groupName)
    })
})