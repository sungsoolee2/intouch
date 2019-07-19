// sideNav functions


// document ready events
$(document).ready(function(){
  // hide elements on load
    $(".navOpt").hide();
    $("#map").hide();
    $(".frontSettings").hide();
    $(".slideContact").hide();
    $(".chatDiv").hide();
  //side Nav 
    $('.sidenav').sidenav();
    var elem = document.querySelector('.sidenav');
    var instance = M.Sidenav.init(elem, {
      onOpenStart: function () {
          console.log("I trigger as soon as the page is loaded");
          $("#map").animate({ "width": "85%"}, 'fast'); 
          $(".homeMenu").fadeOut();
      },
      onCloseEnd: function () {
          console.log("same");
          $("#map").animate({ "width": "100%"}, 'fast');
          $(".homeMenu").fadeIn();
      }
    });
    // emoji Chat
    $("#chatMsg").emojioneArea({

    }
    );

})

// home Navigation
$("#homeContact").click(function() {
  if($(".slideContact").is(':visible')){
    $('html,body').animate({
        scrollTop: $(".slideContact").offset().top},
        'slow');
}
else{
    $(".slideContact").slideToggle();
    $('html,body').animate({
        scrollTop: $(".slideContact").offset().top},
        'slow');
}
});

// slideContact close
$(".ctcClose").click(function() {
  $(".slideContact").fadeOut();
  $('html,body').animate({
    scrollTop: $(".frontContainer").offset().top},
    'slow');
});


// burger menu
$("#goto").click(function(){
    // animate burger on click
    var state = $(this).attr("data-state");
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-open"));
      $(this).attr("data-state", "open");
      // $(this).css({ "filter": "brightness(200%)"});
      $(".navBar").animate({ "height": "89%"});
      // $(".navBar").css({ "background": "#898991"});
      // $(".burgerDiv").animate({backgroundColor: "#ff0000" });
      // $(".mainLogo").animate({ "height": "140px", "width": "160px"});
    }else if( state === "open"){
    $(this).attr("src", $(this).attr("data-close"));
    $(this).attr("data-state", "still");
    $(this).css({ "filter": "none"});
    $(".navBar").animate({ "height": "55%"});
    // $(".navBar").css({ "background": "#d9dadf"});
    // $(".mainLogo").animate({ "height": "120px", "width": "140px"});
    }
    // toggle options
    $(".navOpt").slideToggle();
});

// burger buttons
// Navigate
$(".map").click(function(){
  $("#map").toggle("slide");
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


// current location
var map, infoWindow;
      function initMap() {
        map = new google.maps.Map(document.getElementById('map'), {
          center: {lat: -34.397, lng: 150.644},
          zoom: 16
        });

           
            
        // Try HTML5 geolocation.
        if (navigator.geolocation) {
          
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };


            var marker = new google.maps.Marker({
              position: pos, 
              map: map,
              draggable: true,
              animation: google.maps.Animation.BOUNCE,
            });       

            map.setCenter(pos);
            marker.addListener('click', toggleBounce);
            function toggleBounce() {
              if (marker.getAnimation() !== null) {
                marker.setAnimation(null);
              } else {
                marker.setAnimation(google.maps.Animation.DROP);
              }
            }

          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
          
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
        
      }
      function handleLocationError(browserHasGeolocation, infoWindow, pos) {
        infoWindow.setPosition(pos);
        infoWindow.setContent(browserHasGeolocation ?
                              'Error: The Geolocation service failed.' :
                              'Error: Your browser doesn\'t support geolocation.');
        infoWindow.open(map);
      }

      // footer
      // chatButton
      $(".chatBtn").click(function(){
        $(".chatDiv").slideToggle();
      })
      // time
      var update = function() {
        $(".time").html(moment().format('MMMM Do YYYY, h:mm:ss a'));
    }
    setInterval(update, 1000);



