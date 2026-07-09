import mongoose from "mongoose";
import dotenv from "dotenv";
import fs from "fs";
import Product from "./models/Product.js";
import { Chair, Bookshelf } from "./models/Category.js";

dotenv.config();

//  Seed file imports bookshelf.json into MongoDB
// Run it once after adding MongoDB link to .env file
const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for seeding");

    // --- Products (existing) ---
    const rawData = fs.readFileSync("../bookshelf.json", "utf-8");
    const jsonData = JSON.parse(rawData);

    // Support both formats of bookshelf.json
    const listings = (jsonData.listings || jsonData).map((listing) => {
      // Remove exported MongoDB _id so Atlas generates new IDs
      const { _id, ...product } = listing;
      return product;
    });

    await Product.deleteMany();
    console.log("Old products removed");

    await Product.insertMany(listings);
    console.log("bookshelf.json data seeded successfully");

    // --- Chairs (new) ---
    const chairsRaw = fs.readFileSync("../chairs.json", "utf-8");
    const chairsJson = JSON.parse(chairsRaw);
    const chairListings = (chairsJson.listings || chairsJson).map((item) => {
      const { _id, ...rest } = item;
      return rest;
    });

    await Chair.insertMany(chairListings);
    console.log(`Seeded ${chairListings.length} chairs`);

    // --- Bookshelves (new) ---
    const bookshelvesRaw = fs.readFileSync("../bookshelf.json", "utf-8");
    const bookshelvesJson = JSON.parse(bookshelvesRaw);
    const bookshelfListings = (bookshelvesJson.listings || bookshelvesJson).map(
      (item) => {
        const { _id, ...rest } = item;
        return rest;
      },
    );

    await Bookshelf.insertMany(bookshelfListings);
    console.log(`Seeded ${bookshelfListings.length} bookshelves`);

    console.log("All seeding complete!");
    process.exit();
  } catch (error) {
    console.error("Seeding failed:", error.message);
    process.exit(1);
  }
};

seedProducts();
