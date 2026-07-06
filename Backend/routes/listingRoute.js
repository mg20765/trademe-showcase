import express from "express";
import Listing from "../models/listingModel.js";

const router = express.Router();

// Get ALL listing items
router.get("/", async (req, res) => {
  try {
    const listings = await Listing.find();
    res.json(listings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get listing by item_num
router.get("/:item_num", async (req, res) => {
  try {
    const listing = await Listing.findOne({
      item_num: Number(req.params.item_num),
    });

    if (!listing) {
      return res.status(404).json({ message: "Listing not found" });
    }

    res.json(listing);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;
