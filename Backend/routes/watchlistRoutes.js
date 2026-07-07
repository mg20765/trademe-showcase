import { Watchlist } from "../models/watchlistModel.js";

export const getWatchlist = async (req, res) => {
  try {
    const data = await Watchlist.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to read watchlist from database" });
  }
};

export const addToWatchlist = async (req, res) => {
  try {
    const { itemId, title, price_nzd, location, category } = req.body;

    const existing = await Watchlist.findOne({ itemId });
    if (existing) {
      return res.status(200).json(existing); // already watchlisted, no duplicate
    }

    const newEntry = await Watchlist.create({
      itemId,
      title,
      price_nzd,
      location,
      category,
    });
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: "Failed to add item to watchlist" });
  }
};

export const removeFromWatchlist = async (req, res) => {
  try {
    await Watchlist.deleteOne({ itemId: req.params.itemId });
    res.status(200).json({ message: "Removed from watchlist" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item from watchlist" });
  }
};
