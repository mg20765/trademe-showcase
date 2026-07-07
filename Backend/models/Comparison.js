import mongoose from "mongoose";

const comparisonSchema = new mongoose.Schema({
  sessionId: { type: String, required: true },
  productIds: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],
});

export default mongoose.model("Comparison", comparisonSchema);
