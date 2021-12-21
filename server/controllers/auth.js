import { UserModel } from "../../models/User.js";
import AuthService from "../../services/AuthService.js";
import jwt from "jsonwebtoken";
import { getJWT } from "../helpers/index.js";
import { Image } from "../../services/PhotoUpload.js";
export default class Auth {
  static async byJWT(jwt) {
    if (!jwt)
      throw {
        message: "JWT not provided",
      };
    const { id } = await getJWT(jwt);
    if (!id)
      throw {
        message: "ID could not be extracted from JWT",
      };
    return await UserModel.findById(id, { password: 0 }).lean();
  }
  static async signUp({
    username,
    name,
    email,
    password,
    passwordConfirmation,
    profilePicture,
  }) {
    if (!email) {
      throw {
        message: "Please, enter a valid email",
      };
    }
    if (!password) {
      throw {
        message: "Please, enter a password at least 6 characters long",
      };
    }
    if (passwordConfirmation !== password) {
      throw {
        message: "Passwords do not match",
      };
    }
    if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[^a-zA-Z0-9]).{8,1024}$/.test(
        password
      )
    ) {
      throw {
        message: "Please, provide a stronger password",
      };
    }
    const user = await UserModel.findOne({ email });
    if (user) {
      throw {
        message: "E-mail already in use",
      };
    }
    const picture = profilePicture ? await Image.upload(profilePicture) : null;
    await UserModel.create({
      username,
      name,
      email,
      password,
      ...(picture && { profilePicture: picture }),
    });
  }
  static async login({ username, password }) {
    const user = await UserModel.findOne({ username }).lean();
    const samePassword = await AuthService.comparePassword(
      password,
      user?.password
    );
    if (!user || !samePassword) {
      throw {
        message: "User not found",
        status: 404,
      };
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "110h",
    });
    const cookie_settings = {
      httpOnly: false,
      secure: true, //! Postman cannot read it!
      maxAge: 110 * 60 * 60 * 1000,
      sameSite: "none",
      ...(process.env.NODE_ENV === "production"
        ? { domain: process.env.DOMAIN }
        : {}),
    };
    delete user.password;

    return { token, user, cookie_settings };
  }
}
