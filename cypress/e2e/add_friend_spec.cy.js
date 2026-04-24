import testData from '../fixtures/test_data/all_chat_test_data.json'
import loginPage from '../support/pages/login_page'
import mainPage from '../support/pages/main_page'
import addFriendPage from '../support/pages/add_friend_page'
import { verifyFriendRequestEmail } from '../support/helpers/main_helpers'

const username = testData.username
const password = testData.password
const friendUsername = testData.friend_username
const friendPassword = testData.friend_password

describe('Add Friend Test Suite', () => {

    beforeEach(() => {
        loginPage.clickOnPopUpExitButton()
    })

    it('User Searches And Sends Friend Request To Friend', () => {
        loginPage.login(username, password)
        mainPage.getLoadingBox.should('not.be.visible')
        mainPage.doOperationOnFriendRowIfExists('Delete_Friend', friendUsername)
        mainPage.handleMobileMenu(true)
        mainPage.verifyUsername(username)
        mainPage.clickOnAddNewFriendLink()
        addFriendPage.typeUsername(friendUsername)
        addFriendPage.verifySuggestionBox(friendUsername)
        addFriendPage.clickAddFriendButton()
        addFriendPage.returnAddNewFriendResult().should('include', 'Sent Friend Request')
        verifyFriendRequestEmail(username)
    })

    it('User Accepts Friend Request', () => {
        loginPage.login(friendUsername, friendPassword)
        mainPage.handleMobileMenu(true)
        mainPage.verifyUsername(friendUsername)
        mainPage.clickOnNotificationsButton()
        mainPage.acceptFriendRequestFrom(username)
        mainPage.verifyNewFriend(username)
    })
})