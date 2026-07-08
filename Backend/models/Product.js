import mongoose from "mongoose";

// Product model stores listing from bookshelf.json
const productSchema = new mongoose.Schema(
  {
    item_num: {
      type: Number,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },

    condition: {
      type: String,
      required: true,
    },

    location: {
      type: String,
      required: true,
    },
    price_nzd: {
      type: Number,
      required: true,
    },
    images: {
      type: [String],
      default: [],
    },

    seller: String,

    listedDate: String,

    closingDate: String,

    buyNow: Number,

    currentBid: Number,

    category: String,

    details: [
      {
        label: String,
        value: String,
      },
    ],

    summary: [String],

    questions: [
      {
        question: String,
        answer: String,
        askedBy: String,
        date: String,
      },
    ],

    similarListings: [
      {
        item_num: Number,
        title: String,
        price_nzd: Number,
        location: String,
        images: [String],
      },
    ],
  },
  {
    //  Adds createdAt and updatedAt fields to the schema
    timestamps: true,
  },
);

const Product = mongoose.model("Product", productSchema);
export default Product;
