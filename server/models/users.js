"use strict";
const { Model } = require("sequelize");
const { encrypt } = require("../helpers/bcrypt");
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasMany(models.Posts);
      Users.hasMany(models.Comments);
    }
  }
  Users.init(
    {
      username: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: " Username has been not be empyt!",
          },
        },
      },
      password: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: " Password has been not be empyt!",
          },
        },
      },
      avatar: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: " Avatar has been not be empyt!",
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: " Name has been not be empyt!",
          },
        },
      },
      bio: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: " Bio has been not be empyt!",
          },
        },
      },
    },
    {
      hooks: {
        beforeCreate: (user, options) => {
          user.password = encrypt(user.password);
        },
      },
      sequelize,
      modelName: "Users",
    }
  );
  return Users;
};
