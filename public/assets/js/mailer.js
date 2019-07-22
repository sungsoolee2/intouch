"use strict";
// var nodemailer = require('../lib/nodemailer');
// window.onload = function(){
// var nodemailer = require('nodemailer');


var getDistance = function(p1, p2) {
  var R = 6378137; // Earth’s mean radius in meter
  var dLat = rad(p2.lat - p1.lat);
  var dLong = rad(p2.lng - p1.lng);
  var a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(rad(p1.lat)) *
      Math.cos(rad(p2.lat)) *
      Math.sin(dLong / 2) *
      Math.sin(dLong / 2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  var d = R * c;
  return d; // returns the distance in meter
};

$(function() {
      // var okta = require("@okta/okta-sdk-nodejs");
      // console.log(okta);
      console.log("ready!");
      $("#map-btn").on("click", function(e) {
        console.log("please");
        //    main().catch(console.error);
        distanceChecker();
      });
    });
function distanceChecker() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

          $.get("/api/parents/id/1", function(data) {
    console.log(data);
    var children = data.Children;
    var radius = data.radius;

    if (children) {
      console.log(children);
      for (let i = 0; i < children.length; i++) {
        console.log(children[i].location);
        var cEmail = children[i].email;
        /***************************** */
        var location = children[i].location.split(",");
        var lat = parseFloat(location[0]);
        var lng = parseFloat(location[1]);
        var newpos = {
          lat: lat,
          lng: lng
        };

        console.log(Math.ceil(getDistance(pos, newpos)));
        if(Math.ceil(getDistance(pos, newpos))>(radius*1609.34)){
          console.log(data.email);
          console.log(cEmail);
            main("liapoulos711@hotmail.com", "k.liapoulos@gmail.com").catch(console.error);
        }
      }
    }

    ;
  });
      }
    )
  

  }
}
// async..await is not allowed in global scope, must use a wrapper
async function main(parentEmail, childEmail) {
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
    from: parentEmail, // sender address
    to: childEmail, // list of receivers
    subject: "Out of location", // Subject line
    text: "You are outside of the acceptable location!", // plain text body
    html: "<b>You are outside of the acceptable location!</b>" // html body
  });

  console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>

  // Preview only available when sending through an Ethereal account
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
  // Preview URL: https://ethereal.email/message/WaQKMgKddxQDoou...
}
// }
// window.onload = function() {
//   //YOUR JQUERY CODE
//   $(document).ready(function() {
//     $(document).ready(function() {
//       // var okta = require("@okta/okta-sdk-nodejs");
//       // console.log(okta);
//       console.log("ready!");
//       $("#map-btn").on("click", function(e) {
//         console.log("please");
//         //    main().catch(console.error);
//         distanceChecker();
//       });
//     });
//   });
// };
