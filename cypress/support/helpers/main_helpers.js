import emails_data from '../../fixtures/test_data/emails_data.json';

export const verifyFriendRequestEmail = (friendUsername) => {
  const friendRequestEmailSubject = emails_data.friend_request_subject;
  const friendRequestEmailBody = emails_data.friend_request_body;

  friendRequestEmailBody[3] = friendRequestEmailBody[3].replace('{{friend_username}}', friendUsername);
  friendRequestEmailBody[5] = friendRequestEmailBody[5].replace('{{current_year}}', new Date().getFullYear());

  cy.task('getEmailBySubject', friendRequestEmailSubject)
    .then((email) => {
      friendRequestEmailBody.forEach(text => {
        expect(email.html).to.contain(text);
      })
    });
}