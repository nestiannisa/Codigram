const commentRoute = require("express").Router();
const { CommentController } = require("../controllers");
const { authentication, authorization } = require("../middleware/auth");

commentRoute.post("/add/:PostId", authentication, CommentController.addComment);
commentRoute.get("/:PostId", CommentController.showComentByPost);
commentRoute.delete("/delete/:id",authentication,authorization, CommentController.deleteComment)
commentRoute.put("/update/:id",authentication,authorization, CommentController.updateComment)

module.exports = commentRoute;
