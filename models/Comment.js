import mongoose from "mongoose";
const { Schema, model, SchemaTypes } = mongoose;

const CommentSchema = new Schema(
  {
    author: {
      type: SchemaTypes.ObjectId,
      required: [true, "Author is missing"],
      ref: "User",
    },
    post: {
      type: SchemaTypes.ObjectId,
      required: [true, "Post is missing"],
      ref: "Post",
    },
    content: {
      type: String,
      required: [true, "Comment content is missing"],
    },
    votes: {
      up: {
        type: [SchemaTypes.ObjectId],
        default: [],
      },
      down: {
        type: [SchemaTypes.ObjectId],
        default: [],
      },
    },
  },
  { timestamps: true, versionKey: false }
);

export const CommentModel = model("Comment", CommentSchema, "comments");
