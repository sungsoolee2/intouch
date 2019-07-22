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

var notify = {
  distanceChecker: function() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }
        $.get("/api/parents/email/"+email, function(data) {
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
              if (Math.ceil(getDistance(pos, newpos)) > radius * 1609.34) {
                console.log(data.email);
                console.log(cEmail);
                main("liapoulos711@hotmail.com", "k.liapoulos@gmail.com").catch(
                  console.error
                );
              }
            }
          }
        });
      });
    }
  }
};
