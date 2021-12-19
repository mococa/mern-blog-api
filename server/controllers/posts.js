import { POST_REACTIONS } from "../../constants.js";
import { CommentModel } from "../../models/Comment.js";
import { PostModel } from "../../models/Post.js";
import { Reaction } from "./reactions.js";

export default class Post {
  static async create({ title, content, tags = [], subject }, user_id) {
    return await PostModel.create({
      title,
      content,
      tags,
      subject,
      author: user_id,
    });
  }
  static async load({ slug, id }) {
    if (!slug && !id) {
      throw {
        message: "Slug not entered",
      };
    }
    const post = await (slug
      ? PostModel.findOne({ slug })
          .populate("author", ["name", "email", "profilePicture", "username"])
          .lean()
      : id
      ? PostModel.findById(id)
          .populate("author", ["name", "email", "profilePicture", "username"])
          .lean()
      : null);

    if (!post) {
      throw {
        message: "Post not found",
        status: 404,
      };
    }
    const comments = await CommentModel.find({ post: post._id })
      .populate("author", ["name", "email", "profilePicture", "username"])
      .lean();

    const reactions = await Reaction.getInPost({ post: post._id });

    return {
      posts: {
        ...post,
        comments,
        reactions,
      },
    };
  }
  static async paginate({ page = 0, maxPerPage = 15, tag = null }) {
    const query = tag && tag !== "All" ? { tags: { $in: [tag] } } : {};
    return PostModel.find(query)
      .sort({ _id: -1 })
      .skip(page * maxPerPage)
      .limit(maxPerPage)
      .populate("author", ["name", "profilePicture", "username"])
      .lean();
  }
}
