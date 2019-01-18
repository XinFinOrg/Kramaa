const nodemailerAuth = require("./config").nodemailerAuth;
var nodemailer = require('nodemailer');
var ejs = require("ejs");
var fs = require('fs');
var transporter = nodemailer.createTransport({
  host: 'SMTP.kramaa.com',
  port: 587,
  auth: nodemailerAuth
});

module.exports = {
  //OTP
  sendConfirmationOTP: function (recipientmail, otp) {
    ejs.renderFile(__dirname + '/emailerTemplates/emailVerificationOTP.ejs', {
      otp: otp
    }, (err, data) => {
      console.log(err);
      var mailOptions = {
        from: "verification@kraama.com",
        to: recipientmail,
        subject: "Email Verification OTP",
        html: data
      };
      triggerEmail(mailOptions);
    });
  },
  //forgot password mailer
  forgotPasswordMailer: function (req, recipientmail, userhash) {
    var link = "http://" + req.get('host') + "/resetPassword?resetId=" + userhash + "&email=" + recipientmail;
    ejs.renderFile(__dirname + '/emailerTemplates/forgotPassword.ejs', {
      link: link
    }, (err, data) => {
      console.log(err);
      var mailOptions = {
        from: "forgotPassword@mycontract.co",
        to: recipientmail,
        subject: "Reset Password link",
        html: data
      };
      triggerEmail(mailOptions);
    });
  },

  invitationMailer: function(req, recipientmail) {
    var link = "http://" + req.get('host') + "/invitation?inviteEmail="+recipientmail;
    var mailOptions = {
      from: "invite@kramaa.co",
      to: recipientmail,
      subject: "Kramaa Invitation",
      text: link
    };
    triggerEmail(mailOptions);
  }

}

function triggerEmail(mailOptions) {
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
      return;
    }
  });
}
