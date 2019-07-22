console.log("PARSING HERE");
/******* Add a new user to the database on submit */
window.onload = function() {
    //YOUR JQUERY CODE    
    $( document ).ready(function() {
        // var faker = require("faker");
    // var okta = require("@okta/okta-sdk-nodejs");
    // console.log(okta);
    var postParent = function(newParent){
    console.log("THIS is the data"+ JSON.stringify(newParent));
    $.post("/api/parents", newParent).then(function(data){
        console.log("addedParent");
    })
    }

    const DEFAULT_RADIUS = 50;
    console.log( "ready!" );
       $("#submit-btn").on("click", function(e){
            //    e.preventDefault();
    console.log("please");
    const name =
      $("#firstname")
        .val()
        .trim() +
      " " +
      $("#lastname")
        .val()
        .trim();

    console.log(name);
    const email = $(".email").val().trim();

    const newParent = {name: name, radius: DEFAULT_RADIUS};
    console.log(newParent)
    postParent(newParent);

  }) 


});
}



