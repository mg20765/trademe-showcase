import express from "express";
import {
  getComparisonList,
  addToComparison,
  removeFromComparison,
  clearComparison,
} from "../controllers/comparisonController.js";

const router = express.Router();

router.get("/", getComparisonList);
router.post("/", addToComparison);
router.delete("/:productId", removeFromComparison);
router.delete("/", clearComparison);

export default router;
