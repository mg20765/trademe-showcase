🛋️ TradeMe - Marketplace & Category View

This application is used for browsing, searching, bidding, and managing marketplace listings. It interacts with the TradeMe Clone Backend to provide a seamless experience for filtering, watchlisting, and comparing items.

🎨 Tech Stack

CategoryTechnologies & ToolsFrontendReact, JavaScriptBackend & RuntimeNode.js, ExpressDatabase & SecurityMongoDB, CORSState & APICustom Hooks, Fetch API

📂 Project Structure

The server was refactored from one large file into an MVC structure — a structure-only refactor, all API endpoints are unchanged.

server.js # App setup, DB connection, route mounting
seed.js # Database seed script

Backend/
├── config/
├── controllers/ # category, comparison, home, product, watchlist
├── models/ # Category, Comparison, Product, listingModel, watchlistmodel
└── routes/ # category, comparison, home, listing, product, watchlist

Frontend/
├── src/ # Pages, components, hooks
├── public/
└── vite.config.js

🚀 Getting Started

📋 Prerequisites

Node.js installed on your local machine
MongoDB instance running locally or via Atlas
Backend server configured with CORS enabled to allow connections from your frontend domain

🛠️ Installation & Setup

Install dependencies:

bash npm install

Start the local development server:

bash npm run dev

💡 Key Features & Implementation

🛡️ Centralized Hooks & Services

Watchlist: The useWatchlist hook manages immediate, responsive local updates and interfaces with the backend to store user favorites.
Comparison Matrix: The useCompare hook and compareService synchronize selected listings, allowing users to compare details dynamically across the UI.

🔗 API & CORS Integration

The client communicates with your local Express backend. Ensure your backend has cors enabled to avoid cross-origin blocking:

javascriptconst API_URL = "http://localhost:5001/api/listings";

⚡ Modular Architecture

UI actions (like placing bids, purchasing instantly, and heart reactions) are split into isolated components under ui/SharedComponents for fast rendering and structural reusability.

👨‍💻 Team

BrAInBots
Github:
BekahW
Mg20765
ryanjonesnm-svg
varungit111
