import '../commands';

class ProfilePage {

    changePictureButton = '//a[@href="Edit_Profile/"]';
    changePasswordButton = '//a[@href="Change_Password/"]';
    fileInputElement = 'input[type="file"]';
    profilePictureSubmitButton = '[name="changeButton"]';
    profilePictureSubmitResultMessage = '#message';
    currentPasswordField = '[name="currentPass"]';
    newPasswordField = '[name="newPass"]';
    confirmNewPasswordField = '[name="confirmNewPass"]';
    changePasswordSubmitButton = '[name="changePassButton"]';


    verifyUserPicture(username) {
        const userPictureBoxElement = `img[src$='?u=${username}']`;
        cy.get(userPictureBoxElement).should('have.attr', 'width', '100').and('have.attr', 'height', '100');
    }

    verifyUsername(username) {
        const usernameElement = `//h2[contains(., '${username}')]`;
        cy.xpath(usernameElement).should('be.visible');
    }

    clickOnChangePictureButton() {
        cy.xpath(this.changePictureButton).click();
    }

    clickOnChangePasswordButton() {
        cy.xpath(this.changePasswordButton).click();
    }

    uploadPicture(filePath) {
        cy.get(this.fileInputElement).selectFile(filePath);
    }

    clickProfilePictureSubmitButton() {
        cy.get(this.profilePictureSubmitButton).click();
    }

    returnSubmitPictureMessage() {
        return cy.get(this.profilePictureSubmitResultMessage).invoke('text');
    }
    
    typeCurrentPassword(password) {
        cy.get(this.currentPasswordField).type(password);
    }

    typeNewPassword(password) {
        cy.get(this.newPasswordField).type(password);
    }

    typeConfirmNewPassword(password) {
        cy.get(this.confirmNewPasswordField).type(password);
    }

    submitNewPassword() {
        cy.get(this.changePasswordSubmitButton).click();
    }    
}

export default new ProfilePage();
