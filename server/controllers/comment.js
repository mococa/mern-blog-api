import { CommentModel } from "../../models/Comment.js";
import { UserModel } from "../../models/User.js";
const removeVote = (comment, vote, user_id) =>
  comment.votes[vote].splice(comment.votes[vote].indexOf(user_id), 1);
const hasVote = (comment, vote, user_id) =>
  comment.votes[vote].includes(user_id);

export default class Comment {
  static async getInPost({ postId }) {
    const comments = await CommentModel.find({ post: postId })
      .populate(["author"])
      .lean();
    return comments;
  }

  static async create({ content, postId }, user_id) {
    await CommentModel.create({
      author: user_id,
      post: postId,
      content,
      votes: {
        up: [user_id],
      },
    });
    const comments = await this.getInPost({ postId });
    return comments;
  }

  static async vote({ vote, commentId }, user_id) {
    const comment = await CommentModel.findById(commentId);
    if (vote === "up") {
      if (hasVote(comment, "down", user_id)) {
        removeVote(comment, "down", user_id);
        comment.votes.up.push(user_id);
      } else if (hasVote(comment, "up", user_id)) {
        removeVote(comment, "up", user_id);
      } else {
        comment.votes.up.push(user_id);
      }
    } else {
      if (hasVote(comment, "up", user_id)) {
        removeVote(comment, "up", user_id);
        comment.votes.down.push(user_id);
      } else if (hasVote(comment, "down", user_id)) {
        removeVote(comment, "down", user_id);
      } else {
        comment.votes.down.push(user_id);
      }
    }
    await comment.save();
    return comment;
  }
  static async remove({ commentId }, user_id) {
    const user = await UserModel.findById(user_id);
    if (!user.admin)
      throw {
        message: "You're not allowed to do this",
      };
    await CommentModel.findByIdAndDelete(commentId);
    return true;
  }
}
