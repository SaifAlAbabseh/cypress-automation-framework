import '../../commands';


class MainPage {

    loadingBox = '#loading_box_outer_id';
    addNewFriendLink = '#addLink';
    editProfileLink = '#editLink';
    usernameLabel = "div.profileBox  h2.user-card-name";
    menuIcon = '#m';
    friendsBox = '#innerData';
    logoutButton = '//button[contains(., "Logout")]';
    notificationsButton = '//button[@title="Notifications"]';
    notificationsBox = '//div[@id="notificationsBox"]';
    friendRequestAcceptButton = 'input[name="acceptFriendRequestButton"]';
    friendRequestRejectButton = 'input[name="rejectFriendRequestButton"]';
    editProfileButton = '#editLink';
    createGroupButton = '#create_group_button';
    createGroupNameField = '[name="group_name"]';
    createGroupPictureField = '#picField';
    createGroupSubmitButton = '[name="create_group_button"]';
    groupEnterButton = '[title="{{text}}"] > .bubble-btn-container > .bubble-btn.chat';
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
        return cy.get(this.usernameLabel);
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

    getGroupEnterButton(groupName) {
        return cy.get(this.groupEnterButton.replace('{{text}}', groupName));
    }

    get getMobileViewMenuClosebutton() {
        return cy.get(this.mobileViewMenuClosebutton);
    }

    navigateToMainPage() {
        cy.visit(`${Cypress.expose('baseUrl')}/Main/`);
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
                // Use force: true to click even if element appears hidden or is re-rendering
                cy.wrap(friendRow).click({ force: true });
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
        cy.contains(`Successfully created group: ${groupName}`).should('be.visible')
        cy.xpath(this.groupRowByName.replace('{{text}}', groupName)).should('exist');
    }

    verifyGroupHasBeenDeleted(groupName) {
        cy.xpath(this.groupRowByName.replace('{{text}}', groupName)).should('not.exist');
    }

    clickOnGroupEnterButton(groupName) {
        this.getGroupEnterButton(groupName).click();
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