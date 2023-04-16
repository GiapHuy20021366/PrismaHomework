import express from "express";
import {
  userController,
  postController,
  orderController,
} from "../controllers";

const router = express.Router();

const initWebRouters = (app) => {
  router.post("/signup", userController.signup);
  router.get("/users", userController.findAllUsers);
  router.get("/user/:id/drafts", userController.findDrafts);
  router.get("/user/:id", userController.findUserWithOrders);

  router.post("/post", postController.createPost);
  router.get("/post/:id", postController.getPost);
  router.put("/post/:id/views", postController.updatePost);
  router.delete("/post/:id", postController.deletePost);

  router.put("/publish/:id", postController.publishPost);

  return app.use("/", router);
};

module.exports = initWebRouters;
