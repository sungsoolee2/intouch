// Routes
// =============================================================
module.exports = function(app) {
  var path = require("path");

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.hbs
  app.get("/", function(req, res) {
    res.render("index");
  });

  // route loads the register.hbs page,

  // app.get("/register", function(req, res) {
  //   res.render("register", {layout: dashMain});
  // });

  // route loads the team.hbs page,

  app.get("/oktadash", function(req, res) {
    res.render("dashboard/oktadash", { layout: "dashMain" });
  });

  // route loads the faq.hbs page,

  app.get("/faq", function(req, res) {
    res.render("faq", { layout: "main" });
  });

  // route loads the dashboard.hbs page,

  app.get("/dashboard", function(req, res) {
    res.render("dashboard/index", { layout: "dashMain" });
  });

  // route loads the team.hbs page,

  app.get("/team", function(req, res) {
    res.render("team", { layout: "teamMain" });
  });

  // route loads the landing.hbs page,

  app.get("/landing", function(req, res) {
    res.render("landing", { layout: "dashMain" });
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

  // route loads socketio.hbs page,

  app.get("/socketio", function(req, res) {
    res.render("socketio");
    console.log("Loaded SocketIO Route!!!");
  });
};
