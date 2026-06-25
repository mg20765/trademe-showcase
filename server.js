import dotenv from "dotenv";
dotenv.config();

import express from "express";
import {
  handleGrokChat,
  searchListings,
  addListing,
  deleteListing,
} from "./controllers.js";

const app = express();
app.use(express.json());

app.post("/api/chat", handleGrokChat);
app.get("/api/listings/search", searchListings);

app.post("/api/listings", addListing);
app.delete("/api/listings/:id", deleteListing);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
