import mongoose from "mongoose";

const videoSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true
    },

    description: String,

    thumbnailUrl: String,

    videoUrl: String,

    category: {
      type: String,
      required: true
    },

    channel: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Channel"
    },

    uploader: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User"
    },

    views: {
      type: Number,
      default: 0
    },

    likes: {
      type: Number,
      default: 0
    },

    dislikes: {
      type: Number,
      default: 0
    }
  },
  {
    timestamps: true
  }
);

export default mongoose.model(
  "Video",
  videoSchema
);