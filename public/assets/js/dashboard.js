$(document).ready(function(){
  $("#imageDiv").hide();
  $(".slideContact").hide();
  $('.datepicker').datepicker();
  displayImage();
});


//Put image links to array
var images = ["../public/assets/images/dashboard/1.jpg", "../public/assets/images/dashboard/2.jpg", "../public/assets/images/dashboard/3.jpg", "../public/assets/images/dashboard/4.jpg",
            "../public/assets/images/dashboard/5.jpg", "../public/assets/images/dashboard/6.jpg", "../public/assets/images/dashboard/7.jpg"];

//showImage will hold the setInterval
var showImage;
var count = 0;

// This function will replace display whatever image it's given
// in the 'src' attribute of the img tag.

// function displayImage() {
//   // for (var i = 0; i < 5; i++) {
//   // };
//   clearInterval()
//   count = Math.floor(Math.random() * 7)
//   $("#imageDiv").html("<img src=" + images[count] + " width='100%'" + " height='100%'>");

//   $("#imageDiv").fadeIn('slow');
//   setTimeout(function(){$("#imageDiv").fadeOut('slow');}, 3000)
//   console.log("count: " + count);

// }

function displayImage() {
var loopNumber = 0;
if (loopNumber < 999){
    count = Math.floor(Math.random() * 7)
    clearInterval()
    $("#imageDiv").html("<img src=" + images[count] + " width='100%'" + " height='100%'>");
    $("#imageDiv").fadeIn('slow');
    setTimeout(function(){$("#imageDiv").fadeOut('slow');}, 3000)
    loopNumber++
    displayImage()
    console.log(loopNumber)
} else {
  displayImage()
}
}

$("#cardContact").click(function(){

})

// contact us button
$("#cardContact").click(function() {
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

