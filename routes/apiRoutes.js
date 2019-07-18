// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================
var intouch_user_db = require("../config/connection.js");


// Routes
// =============================================================
module.exports = function(app) {

  // Get 
app.get("/api/parents", function(req, res) {
console.log("/api/parents")
    });

app.get("/api/children", function(req, res) {
console.log("/api/children")
    });

    };