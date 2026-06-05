import express from "express";
import cors from "cors";

import authRoutes from "./routes/authRoutes.js";
import channelRoutes from "./routes/channelRoutes.js";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api/auth", authRoutes);

app.use("/api/channels", channelRoutes);

export default app;