import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import Product from "./models/Product.js";

dotenv.config();

//  Seed file imports bookshelf.json into MongoDB
// Run it once after adding MongoDB link to .env file
const seedProducts = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("MongoDB connected for seeding");

        const rawData = fs.readFileSync("./data/bookshelf.json", "utf-8");
        const jsonData = JSON.parse(rawData);

        //  Support both formats of bookshelf.json
        const listings = jsonData.listings || jsonData;

        await Product.deleteMany(); // Clear existing products
        console.log ("Old products removed");

        await Product.insertMany(listings);
        console.log("bookshelf.json data seeded successfully");
        process.exit();
    } catch (error) {
        console.error("Seeding failed:", error.message);
        process.exit(1);
    }
};

seedProducts();