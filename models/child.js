// var sequelize = require("../config/connection.js");


module.exports = function(sequelize, DataTypes) {
    var Child = sequelize.define("Child", {
    // parent_id: {
    //   type: DataTypes.UUID,
    //   unique: true
    // }, //UUID or string we need to retrieve user id token from okta and initialize it as a UUID,
    okta_id: {
      type: DataTypes.STRING,
      // unique: true
  },
  email: {
      type: DataTypes.STRING,
      // unique: true
  },
  // passwordHash: DataTypes.STRING, //this needs to be a password hash, maybe we don't need to store passwords within our database but stored only one
  name: {
      type: DataTypes.STRING,
      allowNull: false,
      // validate: {
      //   len: [1]
      // }
  },
  last_updateMin: DataTypes.FLOAT, //STRING or INTEGER or FLOAT, do we wish to include decimals (is it that important or do we check updates every 15/30 min represented in min
  location: DataTypes.STRING,
     //coordinates as string must be converted into a number, must parse through data to do so
     isParent: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: false
    }, //set to 0
     radius: {
         type: DataTypes.FLOAT
     },//the radius (in miles) restricted by the parent user, have all the children associated to the same radius initially
     setLocation: {
         type: DataTypes.STRING
     }, // the home location set by the parent
     phone_number: DataTypes.STRING,
     age: DataTypes.INTEGER
//     }), {
//   // disable the modification of tablenames; By default, sequelize will automatically
//   // transform all passed model names (first parameter of define) into plural.
//   // if you don't want that, set the following
//   freezeTableName: true
  
// });
    }
    )
  
    Child.associate = function(models) {
    // a child belongs to a parent, multiple foreign keys? possibly, but at the moment we have a one to many relationship (parent to many children)
      Child.belongsTo(models.Parent, {
        foreignKey: {
          allowNull: false
        }
      });
    };
  
    return Child;
  };