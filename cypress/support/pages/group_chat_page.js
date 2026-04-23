import '../commands';

class GroupChatPage {

    groupSettingsButton = '//a[@title="Group Info"]';
    editPictureButton = '//a[text()="Edit Picture"]';
    pictureField = '#picField';
    pictureChangeButton = 'name:changePicButton';
    peopleAddButton = '#add_member_button';
    destroyGroupButton = '//a[text()="Destroy Group"]';

    get getGroupSettingsButton() { return cy.xpath(this.groupSettingsButton); }
    get getEditPictureButton() { return cy.xpath(this.editPictureButton); }
    get getPictureField() { return cy.get(this.pictureField); }
    get getPictureChangeButton() { return cy.get(this.pictureChangeButton); }
    get getPeopleAddButton() { return cy.get(this.peopleAddButton); }
    get getDestroyGroupButton() { return cy.xpath(this.destroyGroupButton); }

    clickOnGroupSettingsButton() {
        return this.getGroupSettingsButton.click();
    }

    clickOnEditPictureButton() {
        return this.getEditPictureButton.click();
    }

    uploadPicture(picturePath) {
        return this.getPictureField.selectFile(picturePath);
    }

    clickOnPictureChangeButton() {
        return this.getPictureChangeButton.click();
    }

    clickOnPeopleAddButton() {
        return this.getPeopleAddButton.click();
    }

    addFriendToGroup(friendUsername) {
        const friendRow = `//tbody[@id='innerData']/tr[td/h2[text()='${friendUsername}']]`;
        return cy.xpath(friendRow).find('#addLink').should('be.visible').click();
    }

    clickOnKickButton(friendUsername) {
        const kickButton = `//tbody[@id='group_users_box']/tr[td/h2[text()='${friendUsername}']]/td/a[@id='kicklink']`;
        return cy.xpath(kickButton).should('be.visible').click();
    }

    clickOnDestroyGroupButton() {
        return this.getDestroyGroupButton.should('be.visible').click();
    }

}

export default new GroupChatPage();
