// Dependencies
// =============================================================

// Sequelize (capital) references the standard library
var Sequelize = require("sequelize");
// sequelize (lowercase) references our connection to the DB.
var sequelize = require("../config/connection.js");

// Creates a "Intouch_user_db" model that matches up with DB
var Intouch_user_db = sequelize.define("user", {
  
  accesstoken: Sequelize.STRING,
  
  name: Sequelize.STRING,
  
  phone: Sequelize.STRING,
  
  age: Sequelize.INTEGER
  
}, {
  // disable the modification of tablenames; By default, sequelize will automatically
  // transform all passed model names (first parameter of define) into plural.
  // if you don't want that, set the following
  freezeTableName: true
});

// Syncs with DB
Intouch_user_db.sync();

// Makes the Intouch_user_db Model available for other files (will also create a table)
module.exports = Intouch_user_db;
