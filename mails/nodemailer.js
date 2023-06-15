import { createTransport } from "nodemailer";

const senderMail = "sushi_with_love@yahoo.com";

const emailTransporter = createTransport({
  host: "smtp.mail.yahoo.com",
  port: 587,
  service: "yahoo",
  secure: false,
  auth: {
    user: "sushi_with_love@yahoo.com",
    pass: "PassSukaBlyat",
  },
  debug: false,
  //   logger: true,
});

function getMailReceivers(mailReceivers) {
  // convert the string array to one string
  var receivers = "";

  for (var i = 0; i < mailReceivers.length; i++) {
    receivers += mailReceivers[i];

    if (i < mailReceivers.length - 1) receivers += ", ";
  }

  return receivers;
}

function getMailOptions(mailReceivers, subj, content) {
  // set the options and return them
  return {
    from: senderMail,
    to: getMailReceivers(mailReceivers),
    subject: subj,
    html: content,
  };
}

export function sendHtmlMail(mailReceivers, subject, html) {
  // send an email
  emailTransporter.sendMail(
    getMailOptions(mailReceivers, subject, html),
    function (error, info) {
      if (error) {
        throw error;
      } else {
        console.log(info.response);
      }
    }
  );
}

sendHtmlMail(
  ["olsarnat@gmail.com", "qeqeprog@gmail.com"],
  "Test Email",
  "<p>Success!</p>"
);
