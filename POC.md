# Proof of Concept (PoC) - Team 3 (Mission 5, Phase 2)

This document serves as our Proof of Concept (PoC), confirming successful full-stack connectivity between our React Frontend, Express Backend API, and Cloud MongoDB Compass database instance.

## 🛠️ Tech Stack Verification

- **Frontend Framework:** React (.jsx / Custom Hooks)
- **Backend Runtime:** Node.js & Express.js (Port 3001)
- **Database Engine:** MongoDB Compass (Cloud Cluster)
- **ORM / Driver:** Mongoose / MongoDB Native Driver

## 🏗️ System Architecture Flow

[Client Browser] ──(HTTP Fetch)──> [Express Server (localhost:3001)] ──(Mongoose)──> [MongoDB Atlas Cloud Cluster]

## ⚡ Verified Working Endpoints

### 1. Listings (Chairs)

- **Endpoint:** `GET http://localhost:3001/api/listings/chairs`
- **Database Collection Source:** `chairs`
- **Status:** Verified Active (Returns Array of Chair Objects)

### 2. Listings (Bookshelves)

- **Endpoint:** `GET http://localhost:3001/api/listings/bookshelves`
- **Database Collection Source:** `bookshelves`
- **Status:** Verified Active (Returns Array of Bookshelf Objects)

### 3. Watchlist Management

- **Endpoint:** `GET http://localhost:3001/api/watchlist`
- **Database Collection Source:** `watchlist`
- **Status:** Verified Active (Successfully maps matching item IDs)

## 📸 Local Connection Verification Check

When launching the backend ecosystem locally via VS Code Terminal, the runtime confirms operations cleanly with the following output state logs:

```text
Isolated server active at http://localhost:3001
Connected to MongoDB 'trademe' database
```

## 👥 Team Integration Points

- **State Management & Fetching:** Abstracted completely inside `useWatchList.js` to decouple UI presentation from active data network fetches.
- **UI Components:** `CategoryPage.jsx` relies dynamically on the backend REST endpoints to parse local TradeMe-style category listings seamlessly.
