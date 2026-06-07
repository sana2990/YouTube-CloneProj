import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createChannel,
  getChannels,
  getChannelById,
  getMyChannels,
  updateChannel,
  deleteChannel,
  subscribeChannel,
  unsubscribeChannel,
} from "../controllers/channelController.js";

const router = express.Router();

router.get("/", getChannels);

router.get(
  "/my-channels",
  protect,
  getMyChannels
);

router.get("/:id", getChannelById);

router.post("/", protect, createChannel);

router.put("/:id", protect, updateChannel);

router.delete("/:id", protect, deleteChannel);

router.put("/:id/subscribe", protect, subscribeChannel);

router.put("/:id/unsubscribe", protect, unsubscribeChannel);

export default router;