import mongoose from "mongoose";

const comparisonSchema = new mongoose.Schema({
  sessionId: {
    type: String,
    required: true,
  },
  productIds: [
    {
      type: mongooseSchema.Types > objectId,
      ref: "product",
    },
  ],
});

export default mongoose.model("Comparison", comparisonSchema);
