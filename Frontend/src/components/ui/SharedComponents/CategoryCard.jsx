{
  /*refactored*/
}

import React, { memo, useCallback, useMemo } from "react";
import WatchlistButton from "./WatchlistButton.jsx";
import WatchlistCheckIcon from "./WatchlistCheckIcon.jsx";
import "./CategoryCard.css";

const CategoryCard = memo(({ item, isWatchlisted, onToggleWatchlist }) => {
  // Safety check to prevent crashes if item is missing
  if (!item) return null;

  // Format price using internationalization API for better localization support
  const numericPrice = Number(item.price_nzd ?? 0);
  const displayPrice = numericPrice.toLocaleString("en-NZ", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  // Memoize callbacks to maintain referential identity for child components
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
      // Replaced alert with a non-blocking log;
      // In a real app, trigger a toast or state update here.
      console.log(`Added "${item.title}" to your Compare list!`);
    },
    [item.title],
  );

  return (
    <div className={`product-card ${isWatchlisted ? "watchlisted" : ""}`}>
      {/* Top right corner badge */}
      <div className="yellow-corner-badge" aria-hidden="true"></div>

      {/* Image or Placeholder Logic */}
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
        <button className="compare-button" onClick={onCompareClick}>
          Compare
        </button>
      </div>

      {/* Card Content */}
      <div className="card-details">
        <h3 className="product-title">{item.title}</h3>
        <p className="product-price">${displayPrice}</p>
        <span className="product-location">
          📍 {item.location || "New Zealand"}
        </span>
      </div>
    </div>
  );
});

CategoryCard.displayName = "CategoryCard";

export default CategoryCard;
