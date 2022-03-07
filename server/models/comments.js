"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Comments extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Comments.belongsTo(models.Posts);
      Comments.belongsTo(models.Users);
    }
  }
  Comments.init(
    {
      text: {
        type: DataTypes.STRING,
        validate: {
          notEmpty: {
            message: "Text must be not empty!",
          },
        },
      },
      UserId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "User Id must be not empty!",
          },
        },
      },
      PostId: {
        type: DataTypes.INTEGER,
        validate: {
          notEmpty: {
            message: "Post Id must be not empty!",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Comments",
    }
  );
  return Comments;
};
