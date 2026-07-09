import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    reservePrice: Number,
    imageUrl: String,
    description: String,
    location: String,
  },
  { strict: false },
);

export const Chair = mongoose.model("Chair", listingSchema, "chairs");
export const Bookshelf = mongoose.model("Bookshelf", listingSchema, "bookshelves");
