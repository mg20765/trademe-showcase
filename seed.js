const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const mongoose = require("mongoose");
const Sample = require("./sample");
console.log("DEBUG - What is Sample?:", typeof Sample);

const seedData = [
  {
    title: "Vintage Camera",
    description: "A rare vintage camera in mint condition.",
    startPrice: 150,
    reservePrice: 250,
  },
  {
    title: "Electric Guitar",
    description: "A high-quality electric guitar in excellent condition.",
    startPrice: 300,
    reservePrice: 450,
  },
  {
    title: "Antique Dresser",
    description: "Stunningly crafted antique dresser.",
    startPrice: 499,
    reservePrice: 499,
    buyNowPrice: 499,
  },
  {
    title: "King Size Bed Frame",
    description: "Sturdy and stylish king size bed frame.",
    startPrice: 1_239,
    reservePrice: 1_239,
    buyNowPrice: 1_239,
  },
  {
    title: "Danske Mobler Monty Sofa",
    description: "A comfortable and stylish sofa from Danske Mobler.",
    startPrice: 250,
    reservePrice: 250,
    buyNowPrice: 250,
  },
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("Connected to MongoDB for seeding.");

    await Sample.deleteMany({});
    console.log("Cleared existing data.");
    await Sample.insertMany(seedData);
    console.log("Seed data inserted successfully.");
  } catch (error) {
    console.error("Error seeding database:", error);
  } finally {
    //closes the connection after seeding//
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB after seeding.");
  }
  process.exit(0);
}

seedDatabase();
