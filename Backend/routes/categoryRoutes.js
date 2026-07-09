import express from "express";
import { getChairs, getBookshelves } from "../controllers/categoryController.js";

const router = express.Router();

router.get("/chairs", getChairs);
router.get("/bookshelves", getBookshelves);

export default router;
