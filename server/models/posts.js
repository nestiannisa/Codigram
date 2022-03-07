"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Posts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Posts.belongsTo(models.Users);
      Posts.hasMany(models.Comments);
    }
  }
  Posts.init(
    {
      image: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: " Image Must be not empty!",
          },
        },
      },
      caption: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: " Caption Must be not empty!",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: " User Id must be not empty!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Posts",
    }
  );
  return Posts;
};
