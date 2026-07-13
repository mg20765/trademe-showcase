import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../assets/logo.png";
import useWatchlist from "../../../hooks/usewatchList";
import WatchlistPanel from "../../../components/ui/SharedComponents/WatchlistPanel/WatchlistPanel";
import "./header.css";

// Header shows the Trade Me logo, small search bar, and right-side icons
function Header() {
  const { watchlistItems, removeFromWatchlist } = useWatchlist();
  const [watchlistOpen, setWatchlistOpen] = useState(false);

  return (
    // Main header container
    <header className="home-header">
      <div className="home-header__inner">
        <Link to="/">
          <img src={logo} alt="Trade Me logo" className="home-header__logo" />
        </Link>

        {/* Search bar */}
        <div className="home-header__search">
          <span>⌕</span>
          <input type="text" placeholder="Search all of Trade Me" />
        </div>

        {/* Right-side navigation icons and actions. */}
        <nav className="home-header__icons">
          <Link to="/category" className="home-header__icon">
            <span>▦</span>
            <p>Categories</p>
          </Link>

          <button className="home-header__icon">
            <span>🔔</span>
            <p>Notifications</p>
          </button>

          {/* Shopping cart button. */}
          <button className="home-header__icon">
            <span>🛒</span>
            <p>Cart</p>
          </button>

          {/* Watchlist button. */}
          <div className="home-header__icon-wrapper">
            <button
              className="home-header__icon"
              onClick={() => setWatchlistOpen((prev) => !prev)}
            >
              <span className="home-header__icon-badge-anchor">
                ♡
                {watchlistItems.length > 0 && (
                  <span className="home-header__badge">
                    {watchlistItems.length}
                  </span>
                )}
              </span>
              <p>Watchlist</p>
            </button>

            {watchlistOpen && (
              <WatchlistPanel
                items={watchlistItems}
                onRemove={removeFromWatchlist}
                onClose={() => setWatchlistOpen(false)}
              />
            )}
          </div>

          <Link to="/compare" className="home-header__icon">
            <span>⇄</span>
            <p>Compare</p>
          </Link>

          <button className="home-header__sell">Start a listing</button>
        </nav>
      </div>
    </header>
  );
}

export default Header;
