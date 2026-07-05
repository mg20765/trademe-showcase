import { useState, useEffect } from "react";

export default function useWatchlist() {
  const [watchlistIds, setWatchlistIds] = useState(new Set());

  useEffect(() => {
    let ignore = false;

    fetch("http://localhost:3001/api/watchlist")
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          setWatchlistIds(new Set(data.map((entry) => entry.itemId)));
        }
      })
      .catch((err) => console.error("Failed to load watchlist:", err));

    return () => {
      ignore = true;
    };
  }, []);

  const toggleWatchlist = async (item, category) => {
    const itemId = item._id;
    const alreadyIn = watchlistIds.has(itemId);

    try {
      if (alreadyIn) {
        await fetch(`http://localhost:3001/api/watchlist/${itemId}`, {
          method: "DELETE",
        });
        setWatchlistIds((prev) => {
          const next = new Set(prev);
          next.delete(itemId);
          return next;
        });
      } else {
        await fetch("http://localhost:3001/api/watchlist", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            itemId,
            title: item.title,
            price_nzd: item.price_nzd,
            location: item.location,
            category,
          }),
        });
        setWatchlistIds((prev) => new Set(prev).add(itemId));
      }
    } catch (err) {
      console.error("Watchlist toggle failed:", err);
    }
  };

  return { watchlistIds, toggleWatchlist };
}
