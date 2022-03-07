const Router = require("express");
const route = Router();

const postRoute = require("./post");
const userRoute = require("./user");
const commentRoute = require("./comment");
route.use("/posts", postRoute);
route.use("/users", userRoute);
route.use("/comments", commentRoute);

module.exports = route;
