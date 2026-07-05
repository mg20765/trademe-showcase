import mongoose from "mongoose";

const watchlistSchema = new mongoose.Schema(
  {
    itemId: { type: String, required: true, unique: true }, // original _id from Chair/Bookshelf
    title: String,
    price_nzd: Number,
    location: String,
    category: String, // "chairs" or "bookshelves"
  },
  { strict: false },
);

export const Watchlist = mongoose.model(
  "Watchlist",
  watchlistSchema,
  "watchlist",
);
