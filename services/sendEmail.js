var nodemailer = require('nodemailer');

module.exports = {
  Send: function (sendTo, subject, content) {
    var mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      SMTPAuth: true,
      SMTPSecure: 'tls',
      auth: {
        user: "laptrinhwebuit@gmail.com",
        pass: "uwowazzancsgushs"
      }
    });
    mailOpts = {
      from: 'Demo system',
      to: sendTo,
      subject: subject,
      generateTextFromHTML: true,
      html: content
    };
    smtpTrans.sendMail(mailOpts, (err, info) => {
      if (err) {
        console.log("Gui that bai");
      } else {
        console.log("Gui thanh cong");
      }
    });
  },

  SendWithReplyTo: function (sendTo, subject, content, replyTo) {
    var mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      SMTPAuth: true,
      SMTPSecure: 'tls',
      auth: {
        user: "hsvbot@gmail.com",
        pass: "ritwjjtrzuickikb"
      }
    });
    mailOpts = {
      from: 'Wabisabi system',
      replyTo: replyTo,
      to: sendTo,
      subject: subject,
      generateTextFromHTML: true,
      html: content
    };
    smtpTrans.sendMail(mailOpts, (err, info) => {
      if (err) {
        console.log("Gui that bai");
      } else {
        console.log("Gui thanh cong");
      }
    });
  }
};
