// Routes
// =============================================================
module.exports = function(app) {

  // Each of the below routes just handles the HTML page that the user gets sent to.

  // index route loads index.hbs
  app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "../view/index.handlebars"));
  });

  // add route loads the register.hbs page,
  
  app.get("/register", function(req, res) {
    res.sendFile(path.join(__dirname, "../view/register.handlebars"));
  });

  // all route loads the dashboard.hbs page,
  
  app.get("/dashboard", function(req, res) {
    res.sendFile(path.join(__dirname, "../view/dashboard.handlebars"));
  });

};
