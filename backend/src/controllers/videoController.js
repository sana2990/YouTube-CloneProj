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
    const { search, category } = req.query;

    let filter = {};

    // search by title
    if (search) {
      filter.title = { $regex: search, $options: "i" };
    }

    // filter by category
    if (category) {
      filter.category = category;
    }

    const videos = await Video.find(filter).sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    res.status(500).json({ message: error.message });
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

export const likeVideo = async (
  req,
  res
) => {
  try {
    const video =
      await Video.findById(
        req.params.id
      );

    if (!video)
      return res.status(404).json({
        message:
          "Video not found",
      });

    video.dislikes =
      video.dislikes.filter(
        (id) =>
          id.toString() !==
          req.user._id.toString()
      );

    if (
      !video.likes.includes(
        req.user._id
      )
    ) {
      video.likes.push(
        req.user._id
      );
    }

    await video.save();

    res.json({
      likes:
        video.likes.length,
      dislikes:
        video.dislikes.length,
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const dislikeVideo =
  async (req, res) => {
    try {
      const video =
        await Video.findById(
          req.params.id
        );

      if (!video)
        return res.status(404).json({
          message:
            "Video not found",
        });

      video.likes =
        video.likes.filter(
          (id) =>
            id.toString() !==
            req.user._id.toString()
        );

      if (
        !video.dislikes.includes(
          req.user._id
        )
      ) {
        video.dislikes.push(
          req.user._id
        );
      }

      await video.save();

      res.json({
        likes:
          video.likes.length,
        dislikes:
          video.dislikes.length,
      });
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  export const getMyVideos = async (req, res) => {
    try {
      const videos =
        await Video.find({
          uploader: req.user._id,
        });

      res.json(videos);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

  export const updateVideo =
  async (req, res) => {
    try {
      const video =
        await Video.findById(
          req.params.id
        );

      if (!video)
        return res.status(404).json({
          message:
            "Video not found",
        });

      if (
        video.uploader.toString() !==
        req.user._id.toString()
      ) {
        return res.status(403).json({
          message:
            "Not authorized",
        });
      }

      video.title =
        req.body.title ||
        video.title;

      video.description =
        req.body.description ||
        video.description;

      video.thumbnailUrl =
        req.body.thumbnailUrl ||
        video.thumbnailUrl;

      video.videoUrl =
        req.body.videoUrl ||
        video.videoUrl;

      video.category =
        req.body.category ||
        video.category;

      await video.save();

      res.json(video);
    } catch (error) {
      res.status(500).json({
        message: error.message,
      });
    }
  };

export const deleteVideo = async (
  req,
  res
) => {
  try {
    const video =
      await Video.findById(
        req.params.id
      );

    if (!video) {
      return res.status(404).json({
        message: "Video not found",
      });
    }

    if (
      video.uploader.toString() !==
      req.user._id.toString()
    ) {
      return res.status(401).json({
        message:
          "Not authorized",
      });
    }

    await video.deleteOne();

    res.json({
      message:
        "Video deleted",
    });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};