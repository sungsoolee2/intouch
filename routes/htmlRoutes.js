// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.hbs
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/index.handlebars"));
  });

  // route loads the register.hbs page,
  
  app.get("/register", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/register.handlebars"));
  });

  // route loads the dashboard.hbs page,
  
  app.get("/dashboard", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/dashboard.handlebars"));
  });

// route loads the profile.hbs page,
  
app.get("/profile", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/profile.handlebars"));
  });

  // route loads the layout.hbs page,
  
app.get("/layout", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/layout.handlebars"));
  });

  // route loads the reset-password.hbs page,
  
app.get("/reset-password", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/reset-password.handlebars"));
  });

    // route loads error.hbs page,
app.get("/error", function(req, res) {
    res.sendFile(path.join(__dirname, "../views/error.handlebars"));
  }); 
   
};
