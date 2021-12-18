import { Router } from "express";
import Comment from "../controllers/comment.js";
import { error_handler } from "../helpers/index.js";
import { check_authentication } from "../middlewares/authentication.js";
export const comment_route = Router();
const route = comment_route;

route.post("/", check_authentication, async (req, res) => {
  try {
    const comments = await Comment.create(req.body, req.user_id);
    return res.status(201).json(comments);
  } catch (err) {
    return error_handler(err, res);
  }
});
route.post("/vote", check_authentication, async (req, res) => {
  try {
    const comment = await Comment.vote(req.body, req.user_id);
    return res.status(200).json(comment);
  } catch (err) {
    return error_handler(err, res);
  }
});
route.delete("/", check_authentication, async (req, res) => {
  try {
    await Comment.remove(req.body, req.user_id);
    return res.status(204).json({ ok: 1 });
  } catch (err) {
    return error_handler(err, res);
  }
});
