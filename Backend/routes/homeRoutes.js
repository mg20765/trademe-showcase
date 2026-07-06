import express from "express";
import  {getHomeListings} from "../controllers/homeController.js";

const router = express.Router();

// GET /api/home/listings
// Frontend Home page uses this route to get MongoDB listings
router.get("/listings", getHomeListings);
export default router;