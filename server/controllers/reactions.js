import { ReactionModel } from "../../models/Reactions.js";
import mongoose from "mongoose";
import { POST_REACTIONS } from "../../constants.js";
export class Reaction {
  static async getInPost({ post }) {
    const reactions = await ReactionModel.find({
      post: mongoose.Types.ObjectId(post),
    });
    const reactions_votes = POST_REACTIONS.map((reaction) => ({
      [reaction]: (reactions || []).filter((el) => el.reaction === reaction)
        .length,
    }));
    return reactions_votes.reduce(
      (obj, item) =>
        Object.assign(obj, { [Object.keys(item)[0]]: Object.values(item)[0] }),
      {}
    );
  }
  static async add({ reaction, post }, user_id) {
    return await ReactionModel.create({
      user: mongoose.Types.ObjectId(user_id),
      post: mongoose.Types.ObjectId(post),
      reaction,
    });
  }
  static async remove({ reaction, post }, user_id) {
    return await ReactionModel.deleteOne({
      user: mongoose.Types.ObjectId(user_id),
      post: mongoose.Types.ObjectId(post),
      reaction,
    });
  }
  static async vote({ reaction, post }, user_id) {
    const previouslyReacted = await ReactionModel.findOne({
      user: mongoose.Types.ObjectId(user_id),
      post: mongoose.Types.ObjectId(post),
      reaction,
    });
    if (previouslyReacted) {
      await this.remove({ post, reaction }, user_id);
    } else {
      await this.add({ reaction, post }, user_id);
    }
    return await this.getInPost({ post });
  }
}
