import express from "express";
import cors from "cors";
import mongoose from "mongoose";

const app = express();
const PORT = 5001;

app.use(express.json());
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/trademe")
  .then(() => console.log("Connected to MongoDB 'trademe' database"))
  .catch((err) => console.error("Could not connect to MongoDB", err));

//category page routing//

const listingSchema = new mongoose.Schema(
  {
    title: String,
    price: Number,
    reservePrice: Number,
    imageUrl: String,
    description: String,
    location: String,
  },
  { strict: false },
);

const Chair = mongoose.model("Chair", listingSchema, "chairs");
const Bookshelf = mongoose.model("Bookshelf", listingSchema, "bookshelves");

app.get("/api/listings/chairs", async (req, res) => {
  try {
    const data = await Chair.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to read chairs from database" });
  }
});

app.get("/api/listings/bookshelves", async (req, res) => {
  try {
    const data = await Bookshelf.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to read bookshelves from database" });
  }
});

//watchlist routing//

const watchlistSchema = new mongoose.Schema(
  {
    itemId: { type: String, required: true, unique: true }, // original _id from Chair/Bookshelf
    title: String,
    price_nzd: Number,
    location: String,
    category: String, // "chairs" or "bookshelves"
  },
  { strict: false },
);

const Watchlist = mongoose.model("Watchlist", watchlistSchema, "watchlist");

app.get("/api/watchlist", async (req, res) => {
  try {
    const data = await Watchlist.find({});
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Failed to read watchlist from database" });
  }
});

app.post("/api/watchlist", async (req, res) => {
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
});

app.delete("/api/watchlist/:itemId", async (req, res) => {
  try {
    await Watchlist.deleteOne({ itemId: req.params.itemId });
    res.status(200).json({ message: "Removed from watchlist" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item from watchlist" });
  }
});

//compare routing//

const compareSchema = new mongoose.Schema(
  {
    itemId: { type: String, required: true, unique: true },
    title: String,
    price_nzd: Number,
    reservePrice: Number,
    location: String,
    category: String,
  },
  { strict: false },
);

const Compare = mongoose.model("Compare", compareSchema, "compare");

app.get("/api/compare", async (req, res) => {
  try {
    const data = await Compare.find({});
    res.json(data);
  } catch (err) {
    res
      .status(500)
      .json({ error: "Failed to read compare list from database" });
  }
});

app.post("/api/compare", async (req, res) => {
  try {
    const { itemId, title, price_nzd, reservePrice, location, category } =
      req.body;

    const existing = await Compare.findOne({ itemId });
    if (existing) {
      return res.status(200).json(existing);
    }

    const newEntry = await Compare.create({
      itemId,
      title,
      price_nzd,
      reservePrice,
      location,
      category,
    });
    res.status(201).json(newEntry);
  } catch (err) {
    res.status(500).json({ error: "Failed to add item to compare list" });
  }
});

app.delete("/api/compare/:itemId", async (req, res) => {
  try {
    await Compare.deleteOne({ itemId: req.params.itemId });
    res.status(200).json({ message: "Removed from compare list" });
  } catch (err) {
    res.status(500).json({ error: "Failed to remove item from compare list" });
  }
});

app.listen(PORT, () => {
  console.log(`Isolated server active at http://localhost:${PORT}`);
});
