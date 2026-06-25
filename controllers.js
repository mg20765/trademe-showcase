import OpenAI from "openai";
import { MongoClient } from "mongodb";

// Declare client variables but do NOT initialize them yet
let xaiClient;
let collection;

// Helper to make sure connections are ready when an endpoint is hit
const initializeClients = () => {
  if (!xaiClient) {
    if (!process.env.XAI_API_KEY) {
      throw new Error("Missing XAI_API_KEY inside environment variables.");
    }
    xaiClient = new OpenAI({
      apiKey: process.env.XAI_API_KEY,
      baseURL: "https://x.ai",
    });
  }

  if (!collection) {
    const client = new MongoClient(
      process.env.MONGO_URI || "mongodb://localhost:27017",
    );
    const db = client.db("sample");
    collection = db.collection("trademe");
  }
};

/**
 * Grok query expansion helper
 */
const getAiSearchTerms = async (userQuery) => {
  try {
    const response = await xaiClient.chat.completions.create({
      model: "grok-4.3",
      messages: [
        {
          role: "system",
          content:
            "You are a database query optimizer for a Kiwi marketplace like Trade Me. Convert the user's search phrase into a single line of comma-separated keywords, specific product synonyms, or generic categories. If they mention a NZ city/region, extract that too. Do not include introductory text, explanations, or quotes. Output only comma-separated words.",
        },
        { role: "user", content: `Extract search terms from: \"${userQuery}\"` },
      ],
    });

    const rawText = response.choices?.[0]?.message?.content || "";
    const terms = rawText
      .split(",")
      .map((term) => term.trim())
      .filter(Boolean);
    return terms.length > 0 ? terms : [userQuery];
  } catch (error) {
    console.error(
      "Grok Search Expansion Failed, falling back to original query:",
      error,
    );
    return [userQuery];
  }
};

/**
 * Your original chat completion endpoint
 */
export const handleGrokChat = async (req, res) => {
  try {
    initializeClients(); // Safe execution anchor
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message field is required" });
    }

    const response = await xaiClient.chat.completions.create({
      model: "grok-4.3",
      messages: [{ role: "user", content: message }],
    });

    res.status(200).json({
      success: true,
      reply: response.choices[0].message.content, // Fixed standard array structure format
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

/**
 * Your Trade Me search endpoint
 */
export const searchListings = async (req, res) => {
  try {
    initializeClients(); // Safe execution anchor
    const { q } = req.query;
    const useAi = req.query.use_ai === "true";

    if (!q) {
      return res
        .status(400)
        .json({ error: "Search query parameter 'q' is required" });
    }

    const searchTerms = useAi ? await getAiSearchTerms(q) : [q];
    const queryConditions = [];

    searchTerms.forEach((term) => {
      const regexCondition = { $regex: term, $options: "i" };
      queryConditions.push({ title: regexCondition });
      queryConditions.push({ description: regexCondition });
      queryConditions.push({ category: regexCondition });
      queryConditions.push({ region: regexCondition });
    });

    const mongoQuery = { $or: queryConditions };
    const listings = await collection.find(mongoQuery).limit(20).toArray();

    return res.status(200).json({
      success: true,
      original_query: q,
      ai_expanded: useAi,
      resolved_terms: searchTerms,
      total_found: listings.length,
      data: listings,
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const addListing = async (req, res) => {
  try {
    initializeClients();
    const newListing = req.body;
    if (!newListing || !newListing.title) {
      return res.status(400).json({ error: "Listing data is required" });
    }

    const result = await collection.insertOne(newListing);
    res.status(201).json({ success: true, data: result.ops[0] });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
export const deleteListing = async (req, res) => {
  try {
    initializeClients();
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: "Listing ID is required" });
    }

    const result = await collection.deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ error: "Listing not found" });
    }

    res
      .status(200)
      .json({ success: true, message: "Listing deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};
