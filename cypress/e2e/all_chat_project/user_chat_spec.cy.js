import testData from '../../fixtures/test_data/all_chat_test_data.json'
import loginPage from '../../support/pages/all_chat_project/login_page'
import mainPage from '../../support/pages/all_chat_project/main_page'
import addFriendPage from '../../support/pages/all_chat_project/add_friend_page'
import chatPage from '../../support/pages/all_chat_project/chat_page'
import { generateRandomString } from '../../support/helpers/main_helpers'

const username = testData.username
const password = testData.password
const friendUsername = testData.friend_username
const friendPassword = testData.friend_password

describe('User Chat Test Suite', () => {

    beforeEach(() => {
        mainPage.navigateToMainPage()
    })

    it('User search and send friend request to friend', () => {
        mainPage.handleMobileMenu(true)
        mainPage.doOperationOnFriendRowIfExists('Delete_Friend', friendUsername)
        mainPage.clickOnAddNewFriendLink()
        addFriendPage.typeUsername(friendUsername)
        addFriendPage.verifySuggestionBox(friendUsername)
        addFriendPage.clickAddFriendButton()
    })

    it('User accepts friend request', () => {
        mainPage.handleMobileMenu(true)
        mainPage.clickOnNotificationsButton()
        mainPage.acceptFriendRequestFrom(username)
    })

    it('User chats with friend', () => {
        mainPage.handleMobileMenu(true)
        mainPage.doOperationOnFriendRowIfExists('Chat', username)
        const message = generateRandomString(20)
        chatPage.typeMessage(message)
        chatPage.clickSendMessageButton()
        chatPage.verifySentMessage()
    })
})