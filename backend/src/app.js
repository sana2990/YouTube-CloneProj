import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";
import videoRoutes from "./routes/videoRoutes.js";

const app = express();
app.use(express.json());

app.use(cors());

app.use("/api/videos", videoRoutes);

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/channels", channelRoutes);

app.use("api/videos", videoRoutes);

export default app;