const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();
const PORT = 3001;

app.use(express.json());

// Middleware to parse JSON request bodies

function readCategory() {
  try {
    const rawData = fs.readFileSync(DB_FILE, "utf8");
    return JSON.parse(rawData);
  } catch (err) {
    console.error("Error reading database:", err);
    return {};
  }
}
app.get("/api/listings/chairs", (req, res) => {
  const chairs = readCategory("chairs.json");
  res.json(chairs);
});
app.get("/api/listings/bookshelves", (req, res) => {
  const bookshelves = readCategory("bookshelf.json");
  res.json(bookshelves);
});

function writeDatabase(data) {
  try {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2), "utf8");
  } catch (err) {
    console.error("Error writing database:", err);
  }
}

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
app.post("/api/data", (req, res) => {
  const db = readCategory();

  const newListing = {
    id: db.listings.length + 1,
    title: req.body.title,
    description: req.body.description,
    currentBid: req.body.startPrice || 1,
    buyNow: req.body.buyNow || null,
    location: req.body.location || "Unknown",
  };
  db.listings.push(newListing);
  writeDatabase(db);
  res
    .status(201)
    .json({ message: "Listing created successfully", listing: newListing });
});

app.listen(PORT, () => {
  console.log(`BrAInbots Trade Me  Server running at http://localhost:${PORT}`);
});
