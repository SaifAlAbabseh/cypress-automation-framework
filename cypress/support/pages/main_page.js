import '../commands';


class MainPage {

    loadingBox = '#loading_box_outer_id';
    addNewFriendLink = '#addLink';
    editProfileLink = '#editLink';
    usernameLabel = "//div[@class='profileBox']/h2[@style='color:yellow']";
    menuIcon = '#m';
    friendsBox = '#innerData';
    logoutButton = '//button[contains(., "Logout")]';
    notificationsButton = '//button[@title="Notifications"]';
    notificationsBox = '//div[@id="notificationsBox"]';
    friendRequestAcceptButton = 'input[name="acceptFriendRequestButton"]';
    friendRequestRejectButton = 'input[name="rejectFriendRequestButton"]';
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

    doOperationOnFriendRowIfExists(whichOperation, friendUsername) {
        const whichOperationText = whichOperation === 'Chat' ? 'with' : 'name';
        const whichActionCss = `div[class='friendRow'] > a[href='${whichOperation}/?${whichOperationText}=${friendUsername}']`;
        cy.get('body').then($body => {
            const friendRow = $body.find(whichActionCss);
            if (friendRow.length) {
                cy.wrap(friendRow).click();
            }
        });
    }

    verifyNewFriend(friendUsername) {
        const friendRowCss = `div[class='friendRow'] > a[href='Chat/?with=${friendUsername}']`;
        cy.get(friendRowCss).should('exist').and('be.visible');
    }

    clickOnAddNewFriendLink() {
        this.getAddNewFriendLink.click();
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
        cy.xpath(this.friendRowElement.replace('{{text}}', requesterUsername)).find(this.friendRequestAcceptButton).click();
    }

    rejectFriendRequestFrom(requesterUsername) {
        cy.xpath(this.friendRowElement.replace('{{text}}', requesterUsername)).find(this.friendRequestRejectButton).click();
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