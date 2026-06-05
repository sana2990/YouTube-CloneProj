import express from "express";

import protect from "../middleware/authMiddleware.js";

import {
  createVideo,
  getAllVideos,
  getVideoById,
  addView,
  //deleteVideo,
  //likeVideo,
  //dislikeVideo,
} from "../controllers/videoController.js";

const router = express.Router();

router.get("/", getAllVideos);

router.get("/:id", getVideoById);

router.post("/", protect, createVideo);

router.put( "/view/:id", addView);

router.get(
  "/search",
  searchVideos
);

router.get(
  "/category/:category",
  getVideosByCategory
);

//router.post("/:id/dislike", protect, dislikeVideo);

//router.post("/", protect, createVideo);

export default router;