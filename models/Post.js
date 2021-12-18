import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;
import slugify from "slugify";
import { POST_SUBJECTS, POST_REACTIONS } from "../constants.js";
const PostSchema = new Schema(
  {
    author: {
      type: SchemaTypes.ObjectId,
      required: [true, "Author is missing"],
      ref: "User",
    },
    slug: {
      type: String,
    },
    title: {
      type: String,
      required: [true, "Post title is missing"],
      unique: true,
    },
    content: {
      type: String,
      required: [true, "Post content is missing"],
    },
    tags: {
      type: [String],
      default: [],
    },
    subject: {
      type: String,
      enum: POST_SUBJECTS,
      required: "Post subject is missing",
    },
  },
  { timestamps: true, versionKey: false }
);
PostSchema.pre("save", async function () {
  if (this.slug || this.isModified("slug")) return;
  this.slug = slugify(this.title).toLowerCase();
});

export const PostModel = model("Post", PostSchema, "posts");
