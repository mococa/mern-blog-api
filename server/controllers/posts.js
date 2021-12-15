import { CommentModel } from "../../models/Comment.js";
import { PostModel } from "../../models/Post.js";

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
      ? PostModel.findOne({ slug }).lean()
      : id
      ? PostModel.findById(id).lean()
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
    return {
      posts: {
        ...post,
        comments,
      },
    };
  }
  static async paginate({ page = 0, maxPerPage = 15, tag = null }) {
    return PostModel.find(...(tag && { tags: { $in: tag } }))
      .skip(page * maxPerPage)
      .limit(maxPerPage)
      .lean();
  }
}
