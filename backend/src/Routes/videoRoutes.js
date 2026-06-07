import express from "express";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

import {
  createVideo,
  getAllVideos,
  getVideoById,
  addView,
  searchVideos,
  getVideosByCategory,
  likeVideo,
  dislikeVideo,
  getMyVideos,
} from "../controllers/videoController.js";

router.get("/", getAllVideos);

router.get("/my-videos", protect, getMyVideos);

router.get("/search", searchVideos);

router.get(
  "/category/:category",
  getVideosByCategory
);

router.put(
  "/view/:id",
  addView
);

router.put(
  "/:id/like",
  protect,
  likeVideo
);

router.put(
  "/:id/dislike",
  protect,
  dislikeVideo
);

router.post(
  "/",
  protect,
  createVideo
);

router.get(
  "/:id",
  getVideoById
);

export default router;