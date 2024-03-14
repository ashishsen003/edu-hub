const mongoose = require("mongoose");
const Schema = mongoose.Schema; 

const discussionSchema = new Schema(
  {
    lectureId: { type: Schema.Types.ObjectId, ref: "Lecture", required: true },
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    message: { type: String, required: true },
  },
  { timestamps: true }
);

const DiscussionModel = mongoose.model("Discussion", discussionSchema);
module.exports = { DiscussionModel };

