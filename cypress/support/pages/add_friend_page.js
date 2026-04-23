import '../commands';

class AddFriendPage {

    friendUsernameField = '#friendUsername_field';
    addFriendButton = '#addFriendButton';
    suggestionBox = '#sug_box';
    addFriendLabel = '#addfriendLabel';

    get getFriendUsernameField() { return cy.get(this.friendUsernameField); }
    get getAddFriendButton() { return cy.get(this.addFriendButton); } 
    get getSuggestionBox() { return cy.get(this.suggestionBox); }
    get getAddFriendLabel() { return cy.get(this.addFriendLabel); } 

    typeUsername(username) {
        return this.getFriendUsernameField.should('be.visible').type(username);
    }

    verifySuggestionBox(username) {
        const userRow = `//div[@class='sug_row']//h3[contains(., '${username}')]`;
        return cy.xpath(userRow).should('be.visible').click();
    }

    clickAddFriendButton() {
        return this.getAddFriendButton.should('be.visible').click();
    }

    returnAddNewFriendResult() {
        return this.getAddFriendLabel.should('be.visible').invoke('text');
    }
}

export default new AddFriendPage();