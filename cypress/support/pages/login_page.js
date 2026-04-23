import '../commands';

class LoginPage{

    popupExitButton = '#exit';
    usernameInputField = '#username_inputfield';
    passwordInputField = '#userpassword_field';
    loginButton = '#login_buttontag';
    signupSwitcherButton = "//button[contains(., 'Create an account')]";
    loginSwitcherButton = "//button[contains(., '< Go back to login')]";
    signupEmailField = '#signupemail_inputfield';

    get getPopupExitButton() { return cy.get(this.popupExitButton); }
    
    get getUsernameInputField() { return cy.get(this.usernameInputField); }
    
    get getPasswordInputField() { return cy.get(this.passwordInputField); }
    
    get getLoginButton() { return cy.get(this.loginButton); }
    
    get getSignupSwitcherButton() { return cy.xpath(this.signupSwitcherButton); }
    
    get getLoginSwitcherButton() { return cy.xpath(this.loginSwitcherButton); }
    
    get getSignupEmailField() { return cy.get(this.signupEmailField); }

    verifyPageTitle(expectedTitle) {
        cy.title().should('eq', expectedTitle);
    }

    clickOnPopUpExitButton() {
        this.getPopupExitButton.should('be.visible').click();
    }

    typeInUsernameInputField(username) {
        this.getUsernameInputField.should('be.visible').type(username);
    }

    typeInPasswordInputField(password) {
        this.getPasswordInputField.should('be.visible').type(password);
    }

    clickOnLoginButton() {
        this.getLoginButton.should('be.visible').click();
    }

    clickOnSignupSwitcherButton() {
        this.getSignupSwitcherButton.should('be.visible').click();
    }

    clickOnLoginSwitcherButton() {
        this.getLoginSwitcherButton.should('be.visible').click();
    }

    typeInSignupEmailField(email) {
        this.getSignupEmailField.should('be.visible').type(email);
    }

    login(username, password) {
        this.typeInUsernameInputField(username);
        this.typeInPasswordInputField(password);
        this.clickOnLoginButton();
    }
}

export default new LoginPage();
