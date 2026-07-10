import { useState, useEffect } from "react";
import useWatchlist from "../hooks/useWatchlist";
import WatchlistButton from "../components/ui/SharedComponents/WatchlistButton";
import CompareButtonSml from "../components/ui/SharedComponents/CompareButton-sml";
import WatchlistcheckIcon from "../components/ui/SharedComponents/WatchlistcheckIcon";
import CategoryCard from "../components/ui/SharedComponents/CategoryCard.jsx";

import "./CategoryPage.css";

const CATEGORIES = [
  { id: "chairs", label: "Chairs List", icon: "🪑" },
  { id: "bookshelves", label: "Bookshelves List", icon: "📚" },
];

// Change this to your actual API location
const API_URL = "http://localhost:5001/api/categories";

export default function CategoryPage() {
  const [items, setItems] = useState([]);
  const [currentCategory, setCurrentCategory] = useState("chairs");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { watchlistIds, toggleWatchlist } = useWatchlist();
  const [searchTerm, setSearchTerm] = useState("");
  const filteredItems = items.filter((item) =>
    item.title?.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  useEffect(() => {
    // AbortController is the modern way to cancel fetch requests
    const controller = new AbortController();

    const fetchCategoryData = async () => {
      try {
        setLoading(true);
        setError(null);

        const response = await fetch(`${API_URL}/${currentCategory}`, {
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error(`Server responded with ${response.status}`);
        }

        const data = await response.json();
        setItems(data);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message);
        }
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryData();

    // Cleanup function runs when currentCategory changes or component unmounts
    return () => controller.abort();
  }, [currentCategory, searchTerm]);

  return (
    <div className="site-wrapper">
      <nav className="navbar">
        <div className="nav-container">
          <div className="logo-placeholder">Trade Me</div>
          <div className="search-bar-container">
            <input
              type="text"
              placeholder={`Search across ${currentCategory}...`}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button
              className="search-btn"
              onClick={() => setSearchTerm("")}
              aria-label="Clear search"
            >
              ✕
            </button>
          </div>
          <div className="nav-links">
            <span>Watchlist</span>
            <span>My Account</span>
          </div>
        </div>
      </nav>
      {/* HERO SECTION - full width band, sits above the sidebar/grid layout */}
      <section className="hero-section">
        <div className="hero-container">
          <p className="hero-breadcrumb">Home / All Categories</p>
          <h1 className="hero-title">ALL CATEGORIES</h1>

          <div className="hero-search-bar">
            <input
              type="text"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="hero-clear-btn" aria-label="Clear search">
              ✕
            </button>
          </div>

          <div className="hero-refine-row">
            <button className="refine-pill refine-pill-primary">
              ⇄ Refine
            </button>
            <button className="refine-pill">Category ▾</button>
            <button className="refine-pill">Location ▾</button>
            <button className="refine-pill">New &amp; Used ▾</button>
          </div>
        </div>
      </section>

      <div className="page-layout">
        <aside className="sidebar">
          <h3>Market Categories</h3>
          <ul className="category-menu">
            {CATEGORIES.map((cat) => (
              <li
                key={cat.id}
                className={currentCategory === cat.id ? "active-tab" : ""}
              >
                <button onClick={() => setCurrentCategory(cat.id)}>
                  {cat.icon} {cat.label}
                </button>
              </li>
            ))}
          </ul>

          <h3 style={{ marginTop: "24px" }}>Filter Condition</h3>
          <ul>
            {["All item conditions", "Brand New", "Pre-Owned / Used"].map(
              (label, i) => (
                <li key={label}>
                  <label>
                    <input type="checkbox" defaultChecked={i === 0} /> {label}
                  </label>
                </li>
              ),
            )}
          </ul>
        </aside>

        <main className="main-content">
          {loading ? (
            <div className="status-message loading-state">
              Loading products...
            </div>
          ) : error ? (
            <div className="status-message error-state">Error: {error}</div>
          ) : (
            <>
              <header className="results-header">
                <h2>
                  Showing {filteredItems.length} results in{" "}
                  <span>{currentCategory}</span>
                </h2>
              </header>

              <div className="product-grid">
                {filteredItems.length === 0 ? (
                  <p className="no-items">No items found in this category.</p>
                ) : (
                  filteredItems.map((item) => {
                    // Ensure we use the correct ID property
                    const itemId = item._id || item.id;
                    return (
                      <CategoryCard
                        key={itemId}
                        item={item}
                        isWatchlisted={watchlistIds.has(itemId)}
                        onToggleWatchlist={(item) =>
                          toggleWatchlist(item, currentCategory)
                        }
                      />
                    );
                  })
                )}
              </div>
            </>
          )}
        </main>
      </div>

      <footer className="site-footer">
        <p>© 2026 BrAInbots Category View.</p>
      </footer>
    </div>
  );
}
