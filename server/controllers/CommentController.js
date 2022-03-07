const { Comments, Users } = require("../models");

class CommentController {
  static async addComment(req, res) {
    try {
      const { text} = req.body;
      const UserId = +req.userData.id;
      const postId = +req.params.PostId
      let comment = await Comments.create({
        text,
        UserId,
        PostId:postId,
      });
      comment
        ? res.status(201).json(comment)
        : res.status(403).json({
            message: "token salah",
          });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async showComentByPost(req, res) {
    try {
      const postId = +req.params.PostId;
      let result = await Comments.findAll({
        where: { PostId: postId },
        include: [Users]
      });
      result
        ? res.status(200).json(result)
        : res.status(403).json({
            message: "tidak ada",
          });
    } catch (err) {
      res.status(500).json(err);
    }
  }

  static async deleteComment(req, res) {
    try {
      const id = +req.params.id;
      const UserId = +req.userData.id;

      let result = await Comments.destroy({
        where: { id, UserId },
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

  static async updateComment(req, res) {
    try {
      const id = +req.params.id;
      const { text } = req.body;
      let result = await Comments.update(
        {
          text,
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
}

module.exports = CommentController;
