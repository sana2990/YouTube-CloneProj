import dotenv from "dotenv";

dotenv.config();
console.log(process.env.MONGO_URI);

import connectDB from "./src/config/db.js";
import app from "./src/app.js";

connectDB();

app.listen(process.env.PORT, () => {
  console.log(
    `Server running on port ${process.env.PORT}`
  );
});