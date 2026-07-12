import mongoose from "mongoose";
import dotenv from "dotenv";
import { Chair, Bookshelf } from "./models/Category.js";

dotenv.config();

const checkData = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  const chairCount = await Chair.countDocuments();
  const bookshelfCount = await Bookshelf.countDocuments();
  console.log(`Chairs in DB: ${chairCount}`);
  console.log(`Bookshelves in DB: ${bookshelfCount}`);
  process.exit();
};

checkData();
