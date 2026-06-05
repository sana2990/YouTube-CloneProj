import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    video: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Video"
    },

    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    text: {
      type: String,
      required: true
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Comment",
  commentSchema
);