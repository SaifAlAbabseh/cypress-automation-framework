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

export const generateRandomString = (stringLength) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  for (let i = 0; i < stringLength; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
}

export const getOTPFromEmail = (action) => {
  const emailsSubject = {
    signup: emails_data.signup_subject,
    login: emails_data.login_subject
  }

  return cy.task('getEmailBySubject', {
    subject: emailsSubject[action],
    timeout: 20000,
    interval: 3000,
  })
    .then((email) => {
      const otpPattern = /<div[^>]*id=["'][^"']*verification_code[^"']*["'][^>]*>([\s\S]*?)<\/div>/i;
      const match = email.html.match(otpPattern);
      const otp = match ? match[1].trim() : null;

      return otp;
    })
    .then((otp) => {
      expect(otp, 'OTP is null').to.not.be.null;
      cy.log(`OTP: ${otp}`);

      return cy.wrap(otp);
    });
}