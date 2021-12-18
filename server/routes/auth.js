import { Router } from "express";
import Auth from "../controllers/auth.js";
import { error_handler } from "../helpers/index.js";
import { check_authentication } from "../middlewares/authentication.js";
export const auth_route = Router();
const route = auth_route;

route.post("/sign-up", async (req, res) => {
  try {
    await Auth.signUp(req.body);
    return res.status(201).json({ message: "User successfully created" });
  } catch (err) {
    return error_handler(err, res);
  }
});
route.post("/sign-in", async (req, res) => {
  try {
    const { cookie_settings, token, user } = await Auth.login(req.body);
    res.cookie("jwt", token, cookie_settings);
    return res.status(200).json({ user, token });
  } catch (err) {
    return error_handler(err, res);
  }
});
route.get("/", async (req, res) => {
  try {
    const jwt = req.cookies["jwt"];
    if (!jwt) return res.status(204).send();
    const user = await Auth.byJWT(jwt);
    if (!user) throw new Error("User not found");
    return res.json(user);
  } catch (error) {
    return error_handler(error, res);
  }
});
