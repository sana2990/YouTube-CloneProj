import Video from "../models/video.js";
import Channel from "../models/Channel.js";

export const createVideo = async (
  req,
  res
) => {
  try {
    const {
      title,
      description,
      thumbnailUrl,
      videoUrl,
      category
    } = req.body;

    const channel =
      await Channel.findOne({
        owner: req.user._id
      });

    if (!channel) {
      return res.status(404).json({
        message:
          "Create channel first"
      });
    }

  const video = await Video.create({
  title,
  description,
  thumbnailUrl,
  videoUrl,
  category,
  channel: channel._id,
  uploader: req.user._id
});

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const getAllVideos = async (req, res) => {
    try {
      const videos =
        await Video.find()
          .populate(
            "channel",
            "channelName"
          )
          .sort({
            createdAt: -1
          });

      res.json(videos);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };

export const getVideoById = async (req, res) => {
    try {
      const video =
        await Video.findById(
          req.params.id
        ).populate(
          "channel",
          "channelName"
        );

      if (!video) {
        return res.status(404).json({
          message:
            "Video not found"
        });
      }

      res.json(video);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };

  export const addView = async (req,res) => {
  try {
    const video =
      await Video.findById(
        req.params.id
      );

    if (!video) {
      return res.status(404).json({
        message:
          "Video not found"
      });
    }

    video.views += 1;

    await video.save();

    res.json({
      views: video.views
    });
  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
};

export const searchVideos = async (req, res) => {
    try {
      const keyword =
        req.query.search || "";

      const videos =
        await Video.find({
          title: {
            $regex: keyword,
            $options: "i"
          }
        });

      res.json(videos);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };

export const getVideosByCategory = async (req, res) => {
    try {
      const videos =
        await Video.find({
          category:
            req.params.category
        });

      res.json(videos);
    } catch (error) {
      res.status(500).json({
        message: error.message
      });
    }
  };