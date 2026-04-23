import '../commands';

class ChatPage {

    messageField = '#messageField';
    sendMessageButton = '#sendButton';
    messagesElements = 'div.message-container';
    messagesRowsElements = 'div.message-container > div.message-text';

    get getMessageField() { return cy.get(this.messageField); }
    get getSendMessageButton() { return cy.get(this.sendMessageButton); }
    get getMessagesElements() { return cy.get(this.messagesElements); }
    get getMessagesRowsElements() { return cy.get(this.messagesRowsElements); }

    typeMessage(message) {
        return this.getMessageField.should('be.visible').type(message);
    }

    clickSendMessageButton() {
        return this.getSendMessageButton.should('be.visible').click();
    }

    returnCurrentMessagesCount() {
        return this.getMessagesElements.its('length');
    }

    verifySentMessage(message) {
        return this.getMessagesElements.last().should('contain', message);
    }
}

export default new ChatPage();