import { Router } from "express";
import Comment from "../controllers/comment.js";
import Post from "../controllers/posts.js";
import { error_handler } from "../helpers/index.js";
import { check_authentication } from "../middlewares/authentication.js";
export const posts_route = Router();
const route = posts_route;

route.get("/", async (req, res) => {
  try {
    const posts = await Post.load(req.query);
    return res.json(posts);
  } catch (err) {
    return error_handler(err, res);
  }
});
route.get("/paginate", async (req, res) => {
  try {
    const posts = await Post.paginate(req.query);
    return res.json(posts);
  } catch (err) {
    return error_handler(err, res);
  }
});
route.post("/", check_authentication, async (req, res) => {
  try {
    const post = await Post.create(req.body, req.user_id);
    return res.status(201).json(post);
  } catch (err) {
    return error_handler(err, res);
  }
});
route.post("/comment", check_authentication, async (req, res) => {
  try {
    const comments = await Comment.create(req.body, req.user_id);
    return res.status(201).json(comments);
  } catch (err) {
    return error_handler(err, res);
  }
});
route.post("/comment/vote", check_authentication, async (req, res) => {
  try {
    const comment = await Comment.vote(req.body, req.user_id);
    return res.status(200).json(comment);
  } catch (err) {
    return error_handler(err, res);
  }
});
route.delete("/comment", check_authentication, async (req, res) => {
  try {
    await Comment.remove(req.body, req.user_id);
    return res.status(204).json({ ok: 1 });
  } catch (err) {
    return error_handler(err, res);
  }
});
