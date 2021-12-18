import { ReactionModel } from "../../models/Reactions.js";
import mongo from "mongo";
const { ObjectId } = mongo;

export class Reaction {
  static async getInPost({ post }) {
    const reactions = await ReactionModel.find({ post: ObjectId(post) });
    const reactions_votes = POST_REACTIONS.map((reaction) => ({
      [reaction]: (reactions || []).filter((el) => el.reaction === reaction)
        .length,
    }));
    return reactions_votes;
  }
  static async add({ reaction, post }, user_id) {
    return await ReactionModel.insertOne({
      user: ObjectId(user_id),
      post: ObjectId(post),
      reaction,
    });
  }
  static async remove({ reaction, post }, user_id) {
    return await ReactionModel.deleteOne({
      user: ObjectId(user_id),
      post: ObjectId(post),
      reaction,
    });
  }
  static async vote({ reaction, post }, user_id) {
    const previouslyReacted = await ReactionModel.findOne({
      user: ObjectId(user_id),
      post: ObjectId(post),
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
