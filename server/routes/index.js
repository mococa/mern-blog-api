import { Router } from "express";
import { auth_route } from "./auth.js";
import { comment_route } from "./comment.js";
import { posts_route } from "./posts.js";
export const router = Router()
  .use("/posts", posts_route)
  .use("/auth", auth_route)
  .use("/comments", comment_route);
