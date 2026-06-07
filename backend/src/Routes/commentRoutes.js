import express from "express";
import {
  createComment,
  getCommentsByVideo,
} from "../controllers/commentController.js";
import protect from "../middleware/authMiddleware.js";

const router =
  express.Router();

router.post(
  "/:videoId",
  protect,
  createComment
);

router.get(
  "/:videoId",
  getCommentsByVideo
);

export default router;