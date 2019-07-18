$(document).ready(function(){
    // $("#imageDiv").hide();
    $(".slideContact").hide();
    $('.datepicker').datepicker();
    startSlideshow();
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
function displayImage() {
  $("#imageDiv").html("<img src=" + images[count] + " width='100%'" + " height='100%'>");
  // $("#imageDiv").fadeIn();

}

function nextImage() {
  count++;

  setTimeout(displayImage, 1000);

  // If the count is the same as the length of the image array, reset the count to 0.
  if (count === images.length) {
    count = 0;
  }
  console.log(count)
}

function startSlideshow() {
  showImage = setInterval(nextImage, 3000);
}

