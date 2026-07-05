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
        image: {
            type: String,
            required: true,
        },
    },

    {
        //  Adds createdAt and updatedAt fields to the schema
        timestamps: true,
    }

);

const Product = mongoose.model("Product", productSchema);
export default Product;