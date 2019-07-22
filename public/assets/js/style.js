// sideNav functions
  // const okta = require('@okta/okta-sdk-nodejs');
  // console.log(okta.username);
  // const nodemailer = require("nodemailer");
/**
 * 
 * Code with lots of functionality
 * TODO: split into separate JS files nodemailer etc
 */
// document ready events
$(document).ready(function() {

  // hide elements on load
  $(".navOpt").hide();
  $("#map").hide();
  $(".frontSettings").hide();
  $(".slideContact").hide();
  // $(".chatDiv").hide();
  $(".chatBox").hide();
  //side Nav
  $(".sidenav").sidenav();
  var elem = document.querySelector(".sidenav");
  var instance = M.Sidenav.init(elem, {
    onOpenStart: function() {
      // console.log("I trigger as soon as the page is loaded");
      $("#map").animate({ width: "85%" }, "fast");
      $(".homeMenu").fadeOut();
    },
    onCloseEnd: function() {
      // console.log("same");
      $("#map").animate({ width: "100%" }, "fast");
      $(".homeMenu").fadeIn();
    }
  });
  // emoji Chat
  $("#chatMsg").emojioneArea({});
});

// home Navigation
$("#homeContact").click(function() {
  if ($(".slideContact").is(":visible")) {
    $("html,body").animate(
      {
        scrollTop: $(".slideContact").offset().top
      },
      "slow"
    );
  } else {
    $(".slideContact").slideToggle();
    $("html,body").animate(
      {
        scrollTop: $(".slideContact").offset().top
      },
      "slow"
    );
  }
});

// homepage butotn
$("#home").click(function() {
  window.location = "http://localhost:3500/socketio";
});

// teampage button
$("#homeTeam").click(function() {
  window.location = "http://localhost:3500/team";
});

// FAQpage butotn
$('#homeFAQ').click(function() {
  window.location = "http://localhost:3500/faq"
});

// slideContact close
$(".ctcClose").click(function() {
  $(".slideContact").fadeOut();
  $("html,body").animate(
    {
      scrollTop: $(".frontContainer").offset().top
    },
    "slow"
  );
});

// burger menu
$("#goto").click(function() {
  // animate burger on click
  var state = $(this).attr("data-state");
  if (state === "still") {
    $(this).attr("src", $(this).attr("data-open"));
    $(this).attr("data-state", "open");
    // $(this).css({ "filter": "brightness(200%)"});
    $(".navBar").animate({ height: "89%" });
    // $(".navBar").css({ "background": "#898991"});
    // $(".burgerDiv").animate({backgroundColor: "#ff0000" });
    // $(".mainLogo").animate({ "height": "140px", "width": "160px"});
  } else if (state === "open") {
    $(this).attr("src", $(this).attr("data-close"));
    $(this).attr("data-state", "still");
    $(this).css({ filter: "none" });
    $(".navBar").animate({ height: "55%" });
    // $(".navBar").css({ "background": "#d9dadf"});
    // $(".mainLogo").animate({ "height": "120px", "width": "140px"});
  }
  // toggle options
  $(".navOpt").slideToggle();
});

// burger buttons
// Navigate
$(".map").click(function() {
  $("#map").toggle("slide");
});

// go to dashboard
$('.dashboard').click(function() {
  window.location = "http://localhost:3500/dashboard"
});

// Profile
// must toggle .homeMenu when user closes sideNav
// $(".profile").click(function(){
//
// });
// Settings
$(".settings").click(function() {
  $(".frontSettings").slideToggle();
});
$(".settingClose").click(function() {
  $(".frontSettings").slideToggle();
});

var rad = function(x) {
  return (x * Math.PI) / 180;
};

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

// current location
var map, infoWindow;
function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: -34.397, lng: 150.644 },
    zoom: 16
  });

  // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        };

        console.log(pos);

        var marker = new google.maps.Marker({
          position: pos,
          map: map,
          draggable: true,
          animation: google.maps.Animation.BOUNCE
        });

        map.setCenter(pos);
        marker.addListener("click", toggleBounce);
        function toggleBounce() {
          if (marker.getAnimation() !== null) {
            marker.setAnimation(null);
          } else {
            marker.setAnimation(google.maps.Animation.DROP);
          }
        }
        var reqRadius = 50; //10 miles for radius
        var radiusInMeters = reqRadius * 1609.34;
        var testRadius = 16944.08533718622;
        var acceptableZone = new google.maps.Circle({
          strokeColor: "#428af5",
          strokeOpacity: 0.8,
          strokeWeight: 2,
          fillColor: "#428af5",
          fillOpacity: 0.35,
          map: map,
          center: pos,
          radius: testRadius
        });

        /*************** */
        $.get("/api/parents/id/1", function(data) {
          console.log(data);
          var children = data.Children;
          var iconBase = "https://maps.google.com/mapfiles/kml/shapes/";

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
              console.log(newpos);
              var image =
                "https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png";
              var newmarker = new google.maps.Marker({
                position: newpos,
                map: map,
                draggable: true,
                animation: google.maps.Animation.BOUNCE,
                icon: image
              });

              newmarker.addListener("click", toggleBounce);
              function toggleBounce() {
                if (newmarker.getAnimation() !== null) {
                  newmarker.setAnimation(null);
                } else {
                  newmarker.setAnimation(google.maps.Animation.DROP);
                }
              }

              /************** CODE TO CHECK CHILD IS IN THE LOCATION IF NOT SEND MAIL */
              // var distance = google.maps.geometry.spherical.computeDistanceBetween(new google.maps.LatLng(pos.lat, pos.lng), new google.maps.LatLng(newpos.lat, newpos.lng));
              // console.log(distance);
              console.log(Math.ceil(getDistance(pos, newpos)));
              /****************************** */
            }
          }
        });
      },
      function() {
        handleLocationError(true, infoWindow, map.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation
    handleLocationError(false, infoWindow, map.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(map);
}

// footer
// chatButton
$(".chatBtn").click(function() {
  $(".chatBox").toggle("up");
});
$(".openChatBtn").click(function() {
  window.location = "http://localhost:3500/socketio";
});

// enlargechat
$("#enlarge").click(function() {
  $(".chatBox").toggle();
  $("#map").hide();
  $(".chatBox").css({ "grid-area": "c" });
  $(".chatBox").toggle();
});

// time
var update = function() {
  $(".time").html(moment().format("MMMM Do YYYY, h:mm:ss a"));
};
setInterval(update, 1000);
