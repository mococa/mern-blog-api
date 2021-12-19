import { Router } from "express";
import Post from "../controllers/posts.js";
import { Reaction } from "../controllers/reactions.js";
import { error_handler } from "../helpers/index.js";
import { check_authentication } from "../middlewares/authentication.js";
export const posts_route = Router();
const route = posts_route;

route.get("/", async (req, res) => {
  try {
    const post = await Post.load(req.query);
    return res.json(post);
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
route.put("/vote", check_authentication, async (req, res) => {
  try {
    const votes = await Reaction.vote(req.body, req.user_id);
    return res.status(201).json(votes);
  } catch (err) {
    return error_handler(err, res);
  }
});
