var nodemailer = require("nodemailer");
var ejs = require("ejs");
module.exports = {
  createAndSend: userInfo => {
    var {fullName, email} = userInfo.result;
    let object = {
      fullName: fullName,
      email: email,
      password: userInfo.password
    };
    ejs.renderFile(__dirname + "/emailTemplate.ejs", object, function(err, html) {
      var mailOpts, smtpTrans;
      smtpTrans = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        SMTPAuth: true,
        SMTPSecure: "tls",
        auth: {
          user: "laptrinhwebuit@gmail.com",
          pass: "uwowazzancsgushs"
        }
      });
      mailOpts = {
        from: "Đại hội Đại biểu Hội sinh viên",
        to: email,
        subject: "Tài khoản đăng nhập",
        generateTextFromHTML: true,
        html: html
      };
      smtpTrans.sendMail(mailOpts, (err, info) => {
        if (err) {
          console.log("Gui that bai");
        } else {
          console.log("Gui thanh cong");
        }
      });
    });
  },

  Send: function(sendTo, subject, content) {
    var mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      SMTPAuth: true,
      SMTPSecure: "tls",
      auth: {
        user: "laptrinhwebuit@gmail.com",
        pass: "uwowazzancsgushs"
      }
    });
    mailOpts = {
      from: "Đại hội Đại biểu Hội sinh viên",
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

  SendWithReplyTo: function(sendTo, subject, content, replyTo) {
    var mailOpts, smtpTrans;
    smtpTrans = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      SMTPAuth: true,
      SMTPSecure: "tls",
      auth: {
        user: "hsvbot@gmail.com",
        pass: "ritwjjtrzuickikb"
      }
    });
    mailOpts = {
      from: "Wabisabi system",
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
