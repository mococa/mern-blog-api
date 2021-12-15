import { Router } from "express";
import { auth_route } from "./auth.js";
import { posts_route } from "./posts.js";
export const router = Router()
  .use("/posts", posts_route)
  .use("/auth", auth_route);
