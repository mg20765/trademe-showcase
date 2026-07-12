import Comparison from "../models/Comparison.js";

// Get /api/comparisons
export const getComparisonList = async (req, res) => {
  try {
    const { sessionId } = req.query;
    const comparisonList = await Comparison.findOne({ sessionId }).populate(
      "productIds",
    );
    res.json(comparisonList || { sessionId, productIds: [] });
  } catch (error) {
    res.status(500).json({ message: "Failed to get a comparison list" });
  }
};

// Post /api/comparisons
export const addToComparison = async (req, res) => {
  try {
    const { sessionId, productId } = req.body;
    console.log("Received sessionId:", sessionId, "productId:", productId);

    let comparison = await Comparison.findOne({ sessionId });
    console.log("Existing comparison found:", comparison);

    if (!comparison) {
      comparison = new Comparison({ sessionId, productIds: [productId] });
    } else {
      if (comparison.productIds.length >= 8) {
        console.log(
          "Hit the 8-item limit! Current productIds:",
          comparison.productIds,
        );
        return res
          .status(400)
          .json({ message: "Maximum 8 products can be compared" });
      }
      comparison.productIds.push(productId);
    }

    await comparison.save();
    res.status(201).json(comparison);
  } catch (error) {
    res.status(500).json({ message: "Failed to add product to comparison" });
  }
};

// Delete /api/comparisons/:productId
export const removeFromComparison = async (req, res) => {
  try {
    const { sessionId } = req.query;
    const { productId } = req.params;

    const comparison = await Comparison.findOne({ sessionId });
    if (!comparison) {
      return res.status(404).json({ message: "Comparison list not found" });
    }
    comparison.productIds = comparison.productIds.filter(
      (id) => id.toString() !== productId,
    );
    await comparison.save();
    res.json(comparison);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to remove product from comparison" });
  }
};

// Delete /api/comparisons
export const clearComparison = async (req, res) => {
  try {
    const { sessionId } = req.query;
    await Comparison.findOneAndDelete({ sessionId });
    res.json({ message: "Comparison list cleared" });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear comparison list" });
  }
};
