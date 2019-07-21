// sideNav functions

// document ready events
$(document).ready(function() {
    $(".navOpt").hide();
  
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
  
    // home Navigation
    $("#homeContact").click(function() {});
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
  
  // Contact button (scroll to bottom of page)
  $("#homeContact").click(function() {
      $("html, body").animate({ scrollTop: $(document).height() }, "slow");
      return false;
    });
  
  
  //   scroll down to profileTwo
    $("#downBtn").click(function() {
      $('html,body').animate({
          scrollTop: $(".profileTwo").offset().top},
          'slow');
          $("#lowBtn").fadeIn("slow");   
  });
  // scroll up to page
  $("#upBtn").click(function() {
      $('html,body').animate({
          scrollTop: $(".frontContainer").offset().top},
          'slow');
  });
  
  $("#lowBtn").click(function() {
      $(this).fadeOut("slow");
      $("html, body").animate({ scrollTop: $(document).height() }, "slow");
      return false;
    });
  
  