import '../../commands';

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

    clickOnSendButton() {
        return this.getSendMessageButton.should('be.visible').click();
    }

    returnCurrentMessagesCount() {
        this.getMessagesElements.should('be.visible').then(() => {
            let messagesCount = 0;
            this.getMessagesElements.each(() => {
                messagesCount++;
            });
            return messagesCount;
        });
    }

    verifySentMessage(message) {
        this.getMessagesRowsElements.should('be.visible').last().should('contain.text', message);
    }
}

export default new ChatPage();