import { UserModel } from "../../models/User.js";
import AuthService from "../../services/AuthService.js";
import jwt from "jsonwebtoken";
export default class Auth {
  static async signUp({
    username,
    name,
    email,
    password,
    passwordConfirmation,
    profilePicture,
  }) {
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
    await UserModel.create({ username, name, email, password, profilePicture });
  }
  static async login({ username, password }) {
    const user = await UserModel.findOne({ username }).lean();
    if (!user || !AuthService.comparePassword(password, user.password)) {
      throw {
        message: "Usuário não encontrado",
        status: 404,
      };
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "60s",
    });
    const cookie_settings = {
      httpOnly: false,
      //secure: true, //! Postman cannot read it!
      maxAge: 60 * 1000,
      sameSite: "none",
      ...(process.env.NODE_ENV === "production"
        ? { domain: process.env.DOMAIN }
        : {}),
    };
    delete user.password;

    return { token, user, cookie_settings };
  }
}
