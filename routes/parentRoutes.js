// findAllParents();

// findOneParent();

// createParent();

// deleteParent();

// updateValParent();

// update values for each child owned by the parent
/*                           PARENT
                                |
                                |
            ---------------------------------------
            |                   |                 |
        CHILD RADIUS        CHILD RADIUS        CHILD RADIUS
        CHILD set_location  ----                -----
*/
// 
// updateValForChildren();

// *********************************************************************************
// api-routes.js - this file offers a set of routes for displaying and saving data to the db
// *********************************************************************************

// Dependencies
// =============================================================

// Requiring our models
var db = require("../models");

// Routes
// =============================================================
module.exports = function(app) {

  // GET route for getting all of the posts
  app.get("/api/parents", function(req, res) {
    // var query = {};
    // if (req.query.parent_id) {
    //   query.ParentId = req.query.id;
    // }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Parent.findAll({
    //   where: query,
      include: [db.Child]
    }).then(function(dbParent) {
      res.json(dbParent);
    });
  });

  // Get route for retrieving a single post
  app.get("/api/parents/id/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Parent.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Child]
    }).then(function(dbParent) {
      res.json(dbParent);
    });
  });

    // Get route for retrieving a single post
  app.get("/api/parents/email/:email", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Parent.findOne({
      where: {
        email: req.params.email
      },
      include: [db.Child]
    }).then(function(dbParent) {
      res.json(dbParent);
    });
  });

  app.get("/api/parents/referral/:referral", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Parent.findOne({
      where: {
        referral_code: req.params.referral
      },
      include: [db.Child]
    }).then(function(dbParent) {
      res.json(dbParent);
    });
  });

  app.put("/api/parents", function(req, res) {
    db.Parent.update(
      req.body,
      {
        where: {
          okta_id: req.body.okta_id
        }
      }).then(function(dbParent) {
      res.json(dbParent);
    });
  });

  // POST route for saving a new post
  app.post("/api/parents", function(req, res) {
    console.log(req.body);
    db.Parent.create(req.body).then(function(dbParent) {
      res.json(dbParent);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/parents/:okta_id", function(req, res) {
    db.Parent.destroy({
      where: {
        id: req.params.okta_id
      }
    }).then(function(dbParent) {
      res.json(dbParent);
    });
  });
};

/******************************************* GETS for special variables */
    // ROUTE for retriving okta id index 
