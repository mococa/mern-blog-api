import mongoose from "mongoose";
import { POST_REACTIONS } from "../constants.js";
const { Schema, model, SchemaTypes } = mongoose;

const ReactionSchema = new Schema(
  {
    post: {
      type: SchemaTypes.ObjectId,
      ref: "Post",
    },
    user: {
      type: SchemaTypes.ObjectId,
      ref: "User",
    },
    reaction: {
      type: String,
      enum: POST_REACTIONS,
    },
  },
  { timestamps: true, versionKey: false }
);

export const ReactionModel = model("Reaction", ReactionSchema, "reactions");
