import Channel from "../models/Channel.js";

// Create Channel
export const createChannel = async (
  req,
  res
) => {
  try {
    const {
      channelName,
      description,
      channelBanner,
    } = req.body;

    const channel = await Channel.create({
      channelName,
      description,
      channelBanner,
      owner: req.user._id,
    });

    res.status(201).json(channel);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

// Get All Channels
export const getChannels = async (
  req,
  res
) => {
  const channels =
    await Channel.find().populate(
      "owner",
      "username"
    );

  res.json(channels);
};

// Get Single Channel
export const getChannelById = async (
  req,
  res
) => {
  const channel =
    await Channel.findById(
      req.params.id
    ).populate(
      "owner",
      "username email"
    );

  if (!channel) {
    return res
      .status(404)
      .json({ message: "Not found" });
  }

  res.json(channel);
};

// MY CHANNELS
export const getMyChannels = async (
  req,
  res
) => {
  const channels =
    await Channel.find({
      owner: req.user._id,
    });

  res.json(channels);
};

// Update
export const updateChannel = async (
  req,
  res
) => {
  const channel =
    await Channel.findById(
      req.params.id
    );

  if (!channel) {
    return res
      .status(404)
      .json({ message: "Not found" });
  }

  if (
    channel.owner.toString() !==
    req.user._id.toString()
  ) {
    return res
      .status(403)
      .json({
        message: "Unauthorized",
      });
  }

  channel.channelName =
    req.body.channelName ||
    channel.channelName;

  channel.description =
    req.body.description ||
    channel.description;

  await channel.save();

  res.json(channel);
};

// Delete
export const deleteChannel = async (
  req,
  res
) => {
  const channel =
    await Channel.findById(
      req.params.id
    );

  if (!channel) {
    return res
      .status(404)
      .json({ message: "Not found" });
  }

  if (
    channel.owner.toString() !==
    req.user._id.toString()
  ) {
    return res
      .status(403)
      .json({
        message: "Unauthorized",
      });
  }

  await channel.deleteOne();

  res.json({
    message:
      "Channel deleted successfully",
  });
};