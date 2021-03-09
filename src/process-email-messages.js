'use strict';
const { SendgridEmailSender } = require('./send-email-sender');

const processEmailMessagesFromBus = async(pubSubEvent, context) => {

  const emailObject = JSON.parse(Buffer.from(pubSubEvent.data, 'base64').toString());

  const { subject, message } = emailObject;

  console.log(`Received email with subject [${subject}]`);

  await SendgridEmailSender.sendEmail({ subject, message });
};

module.exports = {
  processEmailMessagesFromBus,
};
