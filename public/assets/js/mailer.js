"use strict";
const nodemailer = require("nodemailer");

function distanceChecker() {
  $.get("/api/parents/id/1", function(data) {
    console.log(data);
    var children = data.Children;

    if (children) {
      console.log(children);
      for (let i = 0; i < children.length; i++) {
        console.log(children[i].location);
        /***************************** */
        var location = children[i].location.split(",");
        var lat = parseFloat(location[0]);
        var lng = parseFloat(location[1]);
        var newpos = {
          lat: lat,
          lng: lng
        };
      }
    }
  });
}
// async..await is not allowed in global scope, must use a wrapper
async function main(parent, child) {
  // Generate test SMTP service account from ethereal.email
  // Only needed if you don't have a real mail account for testing
  let testAccount = await nodemailer.createTestAccount();

  // create reusable transporter object using the default SMTP transport
  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass // generated ethereal password
    }
  });

  // send mail with defined transport object
  let info = await transporter.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}

window.onload = function() {
  //YOUR JQUERY CODE
  $(document).ready(function() {
    $(document).ready(function() {
      // var okta = require("@okta/okta-sdk-nodejs");
      // console.log(okta);
      console.log("ready!");
      $("#map-btn").on("click", function(e) {
        console.log("please");
        //    main().catch(console.error);
      });
    });
  });
};
