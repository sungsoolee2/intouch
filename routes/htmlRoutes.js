// Routes
// =============================================================
module.exports = function(app) {
var path = require("path")

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.hbs
  app.get("/", function(req, res) {
    res.render("index");
  });

  // route loads the register.hbs page,
  
  app.get("/register", function(req, res) {
    res.render("view", {title: "register", layout: "dashMain"});
  });

  // route loads the dashboard.hbs page,
  
  app.get("/dashboard", function(req, res) {
    res.render("dashboard/index");
  });

// route loads the profile.hbs page,
  
app.get("/profile", function(req, res) {
    res.render("profile");
  });

  // route loads the layout.hbs page,
  
app.get("/layout", function(req, res) {
    res.render("layout");
  });

  // route loads the reset-password.hbs page,
  
app.get("/reset-password", function(req, res) {
    res.render("reset-password");
  });

    // route loads error.hbs page,
app.get("/error", function(req, res) {
    res.render("error");
  }); 

};
