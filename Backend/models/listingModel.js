import mongoose from "mongoose";

const listingSchema = new mongoose.Schema(
  {
    item_num: Number,
    title: String,
    condition: String,
    location: String,
    price_nzd: Number,
    seller: String,
    listedDate: String,
    closingDate: String,
    currentBid: Number,
    buyNow: Number,
    category: String,
    images: [String],
    details: [
      {
        label: String,
        value: String,
      },
    ],
    summary: [String],
  },
  {
    collection: "listings",
  },
);

export default mongoose.model("Listing", listingSchema);
