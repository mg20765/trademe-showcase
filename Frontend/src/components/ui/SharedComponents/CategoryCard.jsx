import { memo, useCallback } from "react";
import WatchlistButton from "./WatchlistButton.jsx";
import WatchlistCheckIcon from "./WatchlistcheckIcon.jsx";
import CompareButtonSml from "./CompareButton-sml.jsx";
import "./categoryCard.css";

const CategoryCard = memo(
  ({ item, isWatchlisted, onToggleWatchlist, isCompared, onToggleCompare }) => {
    // Hooks must run on every render, so they come before the early return below.
    const onWatchlistClick = useCallback(
      (e) => {
        e.stopPropagation();
        if (onToggleWatchlist) {
          onToggleWatchlist(item);
        }
      },
      [item, onToggleWatchlist],
    );

    const onCompareClick = useCallback(
      (e) => {
        e.stopPropagation();
        if (onToggleCompare) {
          onToggleCompare(item);
        }
      },
      [item, onToggleCompare],
    );

    if (!item) return null;

    const numericPrice = Number(item.price_nzd ?? 0);
    const displayPrice = numericPrice.toLocaleString("en-NZ", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    return (
      <div className={`product-card ${isWatchlisted ? "watchlisted" : ""}`}>
        <div className="yellow-corner-badge" aria-hidden="true"></div>

        <div className="card-placeholder">
          {item.imageUrl ? (
            <img
              src={item.imageUrl}
              alt={item.title}
              className="card-image"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          ) : (
            <span
              className="placeholder-icon"
              role="img"
              aria-label="Product placeholder"
            ></span>
          )}
        </div>

        <div
          className={`watchlist-button-top-anchor ${isWatchlisted ? "active" : ""}`}
        >
          {isWatchlisted ? (
            <WatchlistCheckIcon onClick={onWatchlistClick} />
          ) : (
            <WatchlistButton onClick={onWatchlistClick} />
          )}
        </div>

        <div className="bottom-action-anchor">
          <CompareButtonSml
            onClick={onCompareClick}
            showBackground={!isCompared}
          />
        </div>

        <div className="card-details">
          <h3 className="product-title">{item.title}</h3>
          <p className="product-price">${displayPrice}</p>
          <span className="product-location">
            📍 {item.location || "New Zealand"}
          </span>
        </div>
      </div>
    );
  },
);

CategoryCard.displayName = "CategoryCard";

export default CategoryCard;
