import '../../commands';
import { getOTPFromEmail } from '../../helpers/main_helpers'

class LoginPage{

    popupExitButton = '#exit';
    usernameInputField = '#username_inputfield';
    passwordInputField = '#userpassword_field';
    loginButton = '#login_buttontag';
    signupSwitcherButton = "//button[contains(., 'Create an account')]";
    loginSwitcherButton = "//button[contains(., '< Go back to login')]";
    signupEmailField = '#signupemail_inputfield';
    otpField = 'input[name=verification_code_field]';
    submitOTPButton = 'input[name=login_verification_button]';

    get getPopupExitButton() { return cy.get(this.popupExitButton); }
    
    get getUsernameInputField() { return cy.get(this.usernameInputField); }
    
    get getPasswordInputField() { return cy.get(this.passwordInputField); }
    
    get getLoginButton() { return cy.get(this.loginButton); }
    
    get getSignupSwitcherButton() { return cy.xpath(this.signupSwitcherButton); }
    
    get getLoginSwitcherButton() { return cy.xpath(this.loginSwitcherButton); }
    
    get getSignupEmailField() { return cy.get(this.signupEmailField); }

    get getOTPField() { return cy.get(this.otpField); }

    get getSubmitOTPButton() { return cy.get(this.submitOTPButton); }

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

    fillOTP(otpCode) {
        this.getOTPField.should('be.visible').type(otpCode);
    }

    clickOnSubmitOTPButton() {
        this.getSubmitOTPButton.should('be.visible').click();
    }

    login(username, password) {
        this.typeInUsernameInputField(username);
        this.typeInPasswordInputField(password);
        this.clickOnLoginButton();
        getOTPFromEmail('login').then((otpCode) => {
            this.fillOTP(otpCode);
            this.clickOnSubmitOTPButton();
        });
    }
}

export default new LoginPage();
