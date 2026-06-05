export const createVideo = async (req, res) => {
  try {
    const {
      title,
      description,
      thumbnailUrl,
      videoUrl,
      category,
      channel,
    } = req.body;

    const video = await Video.create({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      category,
      channel,
      uploader: req.user._id,
    });

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createVideo = async (req, res) => {
  try {
    const {
      title,
      description,
      thumbnailUrl,
      videoUrl,
      category,
      channel,
    } = req.body;

    const video = await Video.create({
      title,
      description,
      thumbnailUrl,
      videoUrl,
      category,
      channel,
      uploader: req.user._id,
    });

    res.status(201).json(video);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};