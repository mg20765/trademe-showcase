import { setDefaultResultOrder } from "dns";
setDefaultResultOrder("ipv4first");

import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import comparisonRoutes from "./routes/comparisonRoutes.js";
import homeRoutes from "./routes/homeRoutes.js";
import watchlistRoutes from "./routes/watchlistRoutes.js";

dotenv.config();

const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/api/home", homeRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/comparisons", comparisonRoutes);
app.use("/api/watchlist", watchlistRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
