import { Chair, Bookshelf } from "../models/listingModel.js";

export const getChairs = async (req, res) => {
  try {
    const data = await Chair.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to read chairs from database" });
  }
};

export const getBookshelves = async (req, res) => {
  try {
    const data = await Bookshelf.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to read bookshelves from database" });
  }
};
