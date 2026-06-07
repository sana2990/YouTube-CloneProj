import Comment from "../models/Comment.js";

export const createComment = async (
  req,
  res
) => {
  try {
    const comment =
      await Comment.create({
        text: req.body.text,
        user: req.user._id,
        video: req.params.videoId,
      });

    res.status(201).json(comment);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const getCommentsByVideo =
  async (req, res) => {
    try {
      const comments =
        await Comment.find({
          video: req.params.videoId,
        })
          .populate(
            "user",
            "username"
          )
          .sort({
            createdAt: -1,
          });

      res.json(comments);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };