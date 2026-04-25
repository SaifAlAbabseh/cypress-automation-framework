import emails_data from '../../fixtures/test_data/emails_data.json';

export const verifyFriendRequestEmail = (friendUsername) => {
  const friendRequestEmailSubject = emails_data.friend_request_subject;
  const friendRequestEmailBody = emails_data.friend_request_body;

  friendRequestEmailBody[3] = friendRequestEmailBody[3].replace('{{friend_username}}', friendUsername);
  friendRequestEmailBody[5] = friendRequestEmailBody[5].replace('{{current_year}}', new Date().getFullYear());

  cy.task('getEmailBySubject', {
    subject: friendRequestEmailSubject,
    timeout: 20000,
    interval: 3000,
  })
    .then((email) => {
      const missingContents = [];
      friendRequestEmailBody.forEach(text => {
        if (!email.html.includes(text)) {
          missingContents.push(text);
        }
      });
      
      expect(
        missingContents.length, 
        `Friend request email HTML is missing the following contents:\n- ${missingContents.join('\n- ')}\n`
      ).to.equal(0);
    });
}