import mongoose from "mongoose";
const { Schema, model } = mongoose;
import AuthService from "../services/AuthService.js";
const validateEmail = function (email) {
  var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return re.test(email);
};
const UserSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "User name is missing"],
    },
    username: {
      type: String,
      unique: true,
      sparse: true,
      required: [true, "Username is missing"],
      minlength: [6, "Your username can't be less than 6 characters long"],
      maxlength: [16, "Your username can't be more than 16 characters long"],
    },
    password: {
      type: String,
      minlength: [6, "Please, provider a stronger password"],
    },
    email: {
      type: String,
      trim: true,
      lowercase: true,
      unique: true,
      required: "Email address is required",
      validate: [validateEmail, "Please fill a valid email address"],
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    profilePicture: {
      type: String,
    },
    admin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true, versionKey: false }
);
UserSchema.pre("save", async function () {
  if (!this.password || !this.isModified("password")) return;
  try {
    const hashedPassword = await AuthService.hashPassword(this.password);
    this.password = hashedPassword;
  } catch (err) {
    console.error(`Error hashing password for user ${this.username}`);
  }
});
export const UserModel = model("User", UserSchema, "users");
