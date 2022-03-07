const { Posts, Users } = require("../models");

class PostController {
  static async getPost(req, res) {
    try {
      let result = await Posts.findAll({
        include: [Users]
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async showUserPost(req, res) {
    try {
      const { id } = req.userData;
      let result = await Posts.findAll({
        order: [["id", "ASC"]],
        where: {
          UserId: id,
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async showUserPostById(req, res) {
    try {
      const userId = +req.params.UserId
      let result = await Posts.findAll({
        where: {
          UserId:userId
        },
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async createPost(req, res) {
    try {
      const { caption} = req.body;
      const UserId  = +req.userData.id;
      let image = req.file.path;
      let result = await Posts.create({
        image,
        caption,
        UserId,
      });
      result
        ? res.status(201).json(result)
        : res.status(403).json({
            message: "token salah",
          });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async updatePost(req, res) {
    try {
      const id = +req.params.id;
      //const UserId  = +req.userData.id;
      const { caption } = req.body;
      let result = await Posts.update(
        {
          caption,
        },
        {
          where: { id },
        }
      );
      result[0] === 1
        ? res.status(200).json({
            message: `${id} has been updated!`,
          })
        : res.status(404)({
            message: `${id} has been not updated!`,
          });
    } catch (err) {
      res.status(500).json(err);
    }
  }
  static async deleteUserPost(req, res) {
    try {
      const id = +req.params.id;
      const UserId = +req.userData.id;
      let result = await Posts.destroy({
        where: { id,UserId },
      });
      result === 1
        ? res.status(200).json({
            message: `${id} has been deleted!`,
          })
        : res.status(403).json({
            message: `${id} has been not deleted!`,
          });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async findById(req, res) {
    try {
      const id = +req.params.id;
      //const UserId  = +req.userData.id;
      let result = await Posts.findAll({
        where: {
          id//, UserId,
        },
        include: [Users]
      });
      res.status(200).json(result);
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async findPostByName(req, re) {}
}

module.exports = PostController;
