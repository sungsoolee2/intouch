/**
 * TO DO: add validation to prevent null values passing through
 */

module.exports = function(sequelize, DataTypes) {

    // sequelize.sync()
  var Parent = sequelize.define("Parent", {
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
    location: DataTypes.STRING, //coordinates as string must be converted into a number, must parse through data to do so
    isParent: {
        type: DataTypes.TINYINT(1),
        allowNull: false,
        defaultValue: true 
    }, //set to 1
    phone_number: DataTypes.STRING,
    referral_code: {
        type: DataTypes.STRING,
        // unique: true
    },
    age: DataTypes.INTEGER,
    radius: DataTypes.INTEGER //acceptable radius for child
});

  Parent.associate = function(models) {
    // Associating Parent with Child
    // When a Parent is deleted, also delete any associated children
    Parent.hasMany(models.Child, {
      onDelete: "cascade"
    });

    /**
     * Should it be a 1-1 relationship
     * Where the parent also belongs to the child (what does this provide?)
     */

    // Parent.belongsTo(models.Child, {
    //     foreignKey: {
    //       allowNull: false
    //     }
    //   });
  };

  return Parent;
};
