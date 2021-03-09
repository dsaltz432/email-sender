'use strict';
const sendgridMail = require('@sendgrid/mail');
const { SecretManager } = require('./secret-manager');

const EMAIL_SEND_TO = process.env.EMAIL_SEND_TO;
const EMAIL_SEND_FROM = process.env.EMAIL_SEND_FROM;


class SendgridEmailSender {

  constructor() {
    this.setSendgridApiKey = false;
  }

  async sendEmail({ subject, message }) {

    if (!this.setSendgridApiKey) {
      const sendgridApiKey = await SecretManager.getSendgridApiKey();
      sendgridMail.setApiKey(sendgridApiKey);
      this.setSendgridApiKey = true;
    }

    const sendgridMessageObject = {
      to: EMAIL_SEND_TO,
      from: EMAIL_SEND_FROM,
      subject,
      html: `<strong>${message}</strong>`,
    };

    try {
      await sendgridMail.send(sendgridMessageObject);
    } catch (e) {
      console.log('Error while sending email using sendgrid', e);
    }
  }

}

exports.SendgridEmailSender = new SendgridEmailSender();
