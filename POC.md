# Proof of Concept (PoC) - Team 3 (Mission 5, Phase 2)

This document serves as our Proof of Concept (PoC), confirming successful full-stack connectivity between our React Frontend, Express Backend API, and Cloud MongoDB Compass database instance.

## 🛠️ Tech Stack Verification

- **Frontend Framework:** React (.jsx / Custom Hooks)
- **Backend Runtime:** Node.js & Express.js (Port 5001)
- **Database Engine:** MongoDB Compass (Cloud Cluster)
- **ORM / Driver:** Mongoose / MongoDB Native Driver

## 🏗️ System Architecture Flow

[Client Browser] ──(HTTP Fetch)──> [Express Server (localhost:5001)] ──(Mongoose)──> [MongoDB Atlas Compass Cloud Cluster]

## ⚡ Verified Working Endpoints

### 1. Listings (Chairs)

- **Endpoint:** `GET http://localhost:5001/api/listings/chairs`
- **Database Collection Source:** `chairs`
- **Status:** Verified Active (Returns Array of Chair Objects)

### 2. Listings (Bookshelves)

- **Endpoint:** `GET http://localhost:5001/api/listings/bookshelves`
- **Database Collection Source:** `bookshelves`
- **Status:** Verified Active (Returns Array of Bookshelf Objects)

### 3. Watchlist Management

- **Endpoint:** `GET http://localhost:5001/api/watchlist`
- **Database Collection Source:** `watchlist`
- **Status:** Verified Active (Successfully maps matching item IDs)

### 4. Compare List

- **Endpoint:** `GET/POST/DELETE http://localhost:5001/api/compare`
- **Database Collection Source:** `compare`
- **Status:** [Confirm with whoever built this - Verified Active / Needs re-check]

## 📸 Local Connection Verification Check

When launching the backend ecosystem locally via VS Code Terminal, the runtime confirms operations cleanly with the following output state logs:

```text
Isolated server active at http://localhost:5001
Connected to MongoDB 'trademe' database
```

## 👥 Team Integration Points

- **State Management & Fetching:** Abstracted completely inside `useWatchList.js` to decouple UI presentation from active data network fetches. _([Maria])_
- **UI Components:** `CategoryPage.jsx` relies dynamically on the backend REST endpoints to parse local TradeMe-style category listings seamlessly. _([Maria])_
- **Compare Feature:** `useCompare` hook and `compareService` synchronize selected listings for side-by-side comparison. _([Ryan])_
- **Homepage:** Landing page composing search/hero and category navigation. _([Varun])_
- **Bid Popup:** Bid/Buy Now modal for placing offers on listings. _([Rebekah])_
- **Listing Page:** Individual listing detail view. \*([Rebekah
  ])\*

BrAInBots team
