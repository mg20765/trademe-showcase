import mongoose from "mongoose";
import dotenv from "dotenv";
import { Chair, Bookshelf } from "./models/Category.js";

dotenv.config();

const CHAIR_IMAGE_COUNT = 9;
const BOOKSHELF_IMAGE_COUNT = 10;

const assignImages = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connected for image assignment");

    // --- Chairs ---
    const chairs = await Chair.find({});
    for (let i = 0; i < chairs.length; i++) {
      const imageNumber = (i % CHAIR_IMAGE_COUNT) + 1; // cycles 1-9, then repeats
      chairs[i].imageUrl = `/chair${imageNumber}.jpg`;
      await chairs[i].save();
    }
    console.log(`Updated imageUrl for ${chairs.length} chairs`);

    // --- Bookshelves ---
    const bookshelves = await Bookshelf.find({});
    for (let i = 0; i < bookshelves.length; i++) {
      const imageNumber = (i % BOOKSHELF_IMAGE_COUNT) + 1; // cycles 1-10, then repeats
      bookshelves[i].imageUrl = `/bookshelf${imageNumber}.jpg`;
      await bookshelves[i].save();
    }
    console.log(`Updated imageUrl for ${bookshelves.length} bookshelves`);

    console.log("Image assignment complete!");
    process.exit();
  } catch (error) {
    console.error("Image assignment failed:", error.message);
    process.exit(1);
  }
};

assignImages();
