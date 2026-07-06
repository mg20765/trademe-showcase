import Product from "../models/Product.js";

// Controller for Home page listings
// It reads listing data from MongoDB and sends it to the frontend
export const getHomeListings = async (req, res) => {
    try {
        // Fetch all products from the database
        const listings = (await Product.find().sort({item_num: 1})); // Sort by item_num in ascending order
        res.status(200).json(listings);
    } catch (error) {
        res.status(500).json ({
            message: "Failed to fetch home listings",
            error: error.message,
        });
    }
        }