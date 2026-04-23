import '../commands';


class MainPage {

    loadingBox = '#loading_box_outer_id';
    addNewFriendLink = '#addLink';
    editProfileLink = '#editLink';
    usernameLabel = "//div[@class='profileBox']/h2[@style='color:yellow']";
    menuIcon = '#m';
    friendsBox = '#innerData';
    addNewFriendButton = '#addLink';
    logoutButton = '//button[contains(., "Logout")]';
    notificationsButton = '//button[@title="Notifications"]';
    notificationsBox = '//div[@id="notificationsBox"]';
    friendRequestAcceptButton = '//button[@name="acceptFriendRequestButton"]';
    friendRequestRejectButton = '//button[@name="rejectFriendRequestButton"]';
    editProfileButton = '#editLink';
    createGroupButton = '#create_group_button';
    createGroupNameField = '#group_name';
    createGroupPictureField = '#picField';
    createGroupSubmitButton = '#create_group_button';
    groupEnterButton = '//div[@class="groupRow"]/a[starts-with(@href, "Group/?group_id=")]';
    mobileViewMenuClosebutton = '#exit_menu_button';
    friendRowElement = `//table//tr[td[1]/h4[contains(., '{{text}}')]]`;
    groupRowByName = `//div[@class='groupRow']/h2[text()='{{text}}']`;

    get getLoadingBox() {
        return cy.get(this.loadingBox);
    }

    get getAddNewFriendLink() {
        return cy.get(this.addNewFriendLink);
    }

    get getEditProfileLink() {
        return cy.get(this.editProfileLink);
    }

    get getUsernameLabel() {
        return cy.xpath(this.usernameLabel);
    }

    get getMenuIcon() {
        return cy.get(this.menuIcon);
    }

    get getFriendsBox() {
        return cy.get(this.friendsBox);
    }

    get getAddNewFriendButton() {
        return cy.get(this.addNewFriendButton);
    }

    get getLogoutButton() {
        return cy.xpath(this.logoutButton);
    }

    get getNotificationsButton() {
        return cy.xpath(this.notificationsButton);
    }

    get getNotificationsBox() {
        return cy.xpath(this.notificationsBox);
    }

    get getFriendRequestAcceptButton() {
        return cy.xpath(this.friendRequestAcceptButton);
    }

    get getFriendRequestRejectButton() {
        return cy.xpath(this.friendRequestRejectButton);
    }

    get getEditProfileButton() {
        return cy.get(this.editProfileButton);
    }

    get getCreateGroupButton() {
        return cy.get(this.createGroupButton);
    }

    get getCreateGroupNameField() {
        return cy.get(this.createGroupNameField);
    }

    get getCreateGroupPictureField() {
        return cy.get(this.createGroupPictureField);
    }

    get getCreateGroupSubmitButton() {
        return cy.get(this.createGroupSubmitButton);
    }

    get getGroupEnterButton() {
        return cy.xpath(this.groupEnterButton);
    }

    get getMobileViewMenuClosebutton() {
        return cy.get(this.mobileViewMenuClosebutton);
    }


    verifyUsername(username) {
        this.getUsernameLabel.should('be.visible').and('include.text', username);
    }

    returnActualFriendRowElement(whichOperation, friendUsername) {
        const whichOperationText = whichOperation.equals('Chat') ? 'with' : 'name';
        const whichActionXpath = `//div[@class='friendRow']/a[@href='${whichOperation}/?${whichOperationText}=${friendUsername}']`;
        return cy.xpath(whichActionXpath);
    }

    removeFriendIfExists(friendUsername) {
        this.returnActualFriendRowElement('Delete_Friend', friendUsername).click();
    }

    clickChatForFriend(friendUsername) {
        this.returnActualFriendRowElement('Chat', friendUsername).click();
    }

    verifyNewFriend(friendUsername) {
        this.returnActualFriendRowElement('Chat', friendUsername).should('exist');
    }

    clickOnAddNewFriendButton() {
        this.getAddNewFriendButton.click();
    }

    clickOnMenuIcon() {
        this.getMenuIcon.click();
    }

    clickOnLogoutButton() {
        this.getLogoutButton.click();
    }

    clickOnNotificationsButton() {
        this.getNotificationsButton.click();
    }

    acceptFriendRequestFrom(requesterUsername) {
        cy.xpath(this.friendRowElement.replace('{{text}}', requesterUsername)).xpath(this.friendRequestAcceptButton).click();
    }

    rejectFriendRequestFrom(requesterUsername) {
        cy.xpath(this.friendRowElement.replace('{{text}}', requesterUsername)).xpath(this.friendRequestRejectButton).click();
    }

    clickOnEditProfileButton() {
        this.getEditProfileButton.click();
    }

    clickOnCreateGroupButton() {
        this.getCreateGroupButton.click();
    }

    typeGroupInfo(groupName, groupImagePath) {
        this.getCreateGroupNameField.type(groupName);
        this.getCreateGroupPictureField.selectFile(groupImagePath);
    }

    clickOnCreateGroupSubmitButton() {
        this.getCreateGroupSubmitButton.click();
    }

    verifyGroupHasBeenCreated(groupName) {
        cy.xpath(this.groupRowByName.replace('{{text}}', groupName)).should('exist');
    }

    verifyGroupHasBeenDeleted(groupName) {
        cy.xpath(this.groupRowByName.replace('{{text}}', groupName)).should('not.exist');
    }

    clickOnGroupEnterButton(groupName) {
        const groupRow = `//div[@id='groupsInnerData']/div[h2[text()='${groupName}']]`;
        cy.xpath(groupRow).xpath(this.groupEnterButton).click();
    }

    clickOnMobileViewMenuClosebutton() {
        this.getMobileViewMenuClosebutton.click();
    }

    handleMobileMenu(menuOperation) {
        // true: open menu, false: close menu, null/undefined: do nothing
        cy.get('body').then($body => {
            if ($body.find(this.menuIcon).is(':visible')) {
                if (menuOperation)
                    this.clickOnMenuIcon();
                else
                    this.clickOnMobileViewMenuClosebutton();
            }
        });
    }
}

export default new MainPage();