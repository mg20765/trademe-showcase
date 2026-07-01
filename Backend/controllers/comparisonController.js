import comparison from "../models/Comparison.js";

// Get /api/comparison
export const getComparisonList = async (req, res) => {
  try {
    const { sessionId } = req.query;
    const comparisonList = await Comparison.findOne({ sessionId }).populate(
      "productIds",
    );
    res.json(comparison || { sessionId, productIds: [] });
  } catch (error) {
    res.status(500).json({ message: "Failed to get a comparison list" });
  }
};

// Post /api/comparison
export const addToComparisonList = async (req, res) => {
  try {
    const { sessionId, productId } = req.body;

    let comparison = await Comparison.findOne({ sessionId });

    if (!comparison) {
      //Creating a new comparison list
      comparison = new Comparison({ sessionId, productIds: [productId] });
    } else {
      //Only allowing a maximum of 8 products
      if (comparison.productIds.length >= 8) {
        return res
          .status(400)
          .json({ message: "Maximum 8 products can be compared" });
      }
      comparison.productIds.push(productId);
    }

    await comparison.save();
    res.json(201).json(comparison);
  } catch (error) {
    res.status(500).json({ message: "Failed to add product to comparison" });
  }
};

//Delete /api/comparison/:productId
export const removeFromComparison = async (req, res) => {
  try {
    const { sessionId } = req.query;
    const { productId } = req.params;

    const comprarison = await Comparison.findOne({ sessionId });
    if (!comparison) {
      return res.status(404).json({ message: "Comparison list not found" });
    }
    comparison.productIds = comprison.productIds.filter(
      (id) => id.toString() !== productId,
    );
    await comparison.save();
    res.json(comparison);
  } catch (error) {
    res.status(500).json({ message: "Failed to clear comparison list" });
  }
};

//Delete /api/comparison
export const clearComparison = async (req, res) => {
  try {
    const { sessionId } = req.query;
    await Comparison.findOneAndDelete({ sessionId });
    res.json({ message: "Comparison list cleared" });
  } catch (error) {
    res.status(500).json({ message: "Failed to clear comparison list" });
  }
};
