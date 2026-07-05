# 🛋️ TradeMe - Marketplace & Category View

This application is used for browsing, searching, bidding, and managing marketplace listings. This application interacts with the TradeMe Clone Backend to provide a seamless user experience for filtering, watchlisting, and comparing items.

---

## 🎨 Tech Stack & Visual Highlights

| Category                | Technologies & Tools                                                 |
| :---------------------- | :------------------------------------------------------------------- |
| **Frontend **           | ![React](https://shields.io) ![JavaScript](https://shields.io)       |
| **Backend & Runtime**   | ![Node.js](https://shields.io) ![Express](https://shields.io)        |
| **Database & Security** | ![MongoDB](https://shields.io) ![CORS](https://shields.io)           |
| **State & API**         | ![Custom Hooks](https://shields.io) ![Fetch API](https://shields.io) |

---

## 📂 Project Structure

The server was refactored from one large file into an MVC structure:

databaseserver.js # App setup, DB connection, route mounting
models/
listingModel.js # Chair, Bookshelf schemas/models
watchlistModel.js # Watchlist schema/model
compareModel.js # Compare schema/model
controllers/
categoryController.js # getChairs, getBookshelves
watchlistController.js # getWatchlist, addToWatchlist, removeFromWatchlist
compareController.js # getCompareList, addToCompare, removeFromCompare
routes/
categoryRoutes.js # GET /api/listings/chairs, /bookshelves
watchlistRoutes.js # GET/POST/DELETE /api/watchlist
compareRoutes.js # GET/POST/DELETE /api/compare

All API endpoints are unchanged from the original single-file version —
this was a structure-only refactor, not a behavior change.

Frontend (src/)

src/
pages/
CategoryPage.jsx # Data fetching + state, composes subcomponents below
components/
CategoryPage/
SearchBar.jsx # Top nav search input
HeroSection.jsx # Hero banner search + refine
Sidebar.jsx # Category menu + condition filters
ProductGrid.jsx # Results header + item cards
ui/
SharedComponents/
CategoryCard.jsx
WatchlistButton.jsx
CompareButton-sml.jsx
WatchlistcheckIcon.jsx
hooks/
useWatchlist.js # Watchlist add/remove/load logic

---

## 🚀 Getting Started

### 📋 Prerequisites

- **Node.js** installed on your local machine.
- **MongoDB** instance running locally or via Atlas.
- **Backend server** configuring CORS to allow connections from your frontend domain.

### 🛠️ Installation & Setup

1. **Install dependencies:**

   ```bash
   npm install
   ```

2. **Start the local development server:**
   ```bash
   npm run dev
   ```

---

## 💡 Key Features & Implementation

### 🛡️ 1. Centralized Hooks & Services

- **Watchlist:** The `usewatchList` hook manages immediate, responsive local updates and interfaces with the backend to store user favorites.
- **Comparison Matrix:** The `useCompare` hook and `compareService` synchronize selected listings, allowing users to compare details dynamically across the UI.

### 🔗 2. API & CORS Integration

The client communicates securely with your local Express backend. Ensure your backend has `cors` enabled to avoid cross-origin blocking:

```javascript
const API_URL = "http://localhost:3001/api/listings";
```

### ⚡ 3. Modular Architecture

UI actions (like placing bids, purchasing instantly, and heart reactions) are split into isolated components under `ui/SharedComponents` to ensure fast rendering performance and structural reusability.

---

## 🗺️ Roadmap

Here are the exciting features planned for upcoming layout iterations:

- [ ] **Search Bar Integration:** Add a text input to filter listings by keyword.
- [ ] **Sorting Options:** Implement sort-by-price (low-to-high, high-to-low).
- [ ] **User Authentication:** Integrate JWT-based login for personalized watchlists.
- [ ] **Pagination:** Improve load times by fetching data in chunks instead of all at once.
- [ ] **Unit Testing:** Add Jest tests for the custom application hooks.

---

## 👨‍💻 Team

<table border="0">
  <tr>
    <td align="center">
      <img src="https://shields.io" alt="BrAInbots" />
    </td>
  </tr>
</table>

---

<p align="center">BrAInBots team:
BekahW
Mg20765
ryanjonesnm-svg
varungit111
</p>
