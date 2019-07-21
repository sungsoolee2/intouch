// findAllChildren();

// findOneChild();

// createChild();

// deleteChild();

/********************************************************************/
// updateValue(); //values that need to be updated
/*
1. LAST_UPDATED
2. LOCATION
3. name (along the line...) OKTA -> update name -> name updated? update in mysql
4. 
5.
*/
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
  app.get("/api/children", function(req, res) {
    var query = {};
    if (req.query.id) {
      query.ParentId = req.query.parent_id;
    }
    // Here we add an "include" property to our options in our findAll query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Child.findAll({
      where: query,
      include: [db.Parent]
    }).then(function(dbChild) {
      res.json(dbChild);
    });
  });

  app.get("/api/children/:id", function(req, res) {
    // Here we add an "include" property to our options in our findOne query
    // We set the value to an array of the models we want to include in a left outer join
    // In this case, just db.Author
    db.Child.findOne({
      where: {
        id: req.params.id
      },
      include: [db.Parent]
    }).then(function(dbChild) {
      res.json(dbChild);
    });
  });

  app.put("/api/children", function(req, res) {
    db.Child.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbChild) {
      res.json(dbChild);
    });
  });

  // POST route for saving a new post
  app.post("/api/children", function(req, res) {
    db.Child.create(req.body).then(function(dbChild) {
      res.json(dbChild);
    });
  });


  app.get("/child-signup/:referral", function(req, res){
    db.Parent.findOne({
      where: {
        referral_code: req.params.referral
      },
      include: [db.Child]
    }).then(function(dbParent) {
      res.json(dbParent);
    });
  })
  app.post("/child-signup/:referral", function(req, res) {
    // let referral
    db.Child.create(req.body).then(function(dbChild) {
      res.json(dbChild);
    });
  });

  // DELETE route for deleting posts
  app.delete("/api/children/:id", function(req, res) {
    db.Child.destroy({
      where: {
        id: req.params.okta_id
      }
    }).then(function(dbChild) {
      res.json(dbChild);
    });
  });

  // PUT route for updating posts
  app.put("/api/children", function(req, res) {
    db.Child.update(
      req.body,
      {
        where: {
          id: req.body.id
        }
      }).then(function(dbChild) {
      res.json(dbChild);
    });
  });
};

