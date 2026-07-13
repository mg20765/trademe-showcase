import { useState, useEffect } from "react";

export default function useWatchlist() {
  const [watchlistIds, setWatchlistIds] = useState(new Set());
  const [watchlistItems, setWatchlistItems] = useState([]);

  useEffect(() => {
    let ignore = false;

    fetch("http://localhost:5001/api/watchlist")
      .then((res) => res.json())
      .then((data) => {
        if (!ignore) {
          setWatchlistIds(new Set(data.map((entry) => entry.itemId)));
          setWatchlistItems(data);
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
        await fetch(`http://localhost:5001/api/watchlist/${itemId}`, {
          method: "DELETE",
        });
        setWatchlistIds((prev) => {
          const next = new Set(prev);
          next.delete(itemId);
          return next;
        });
        setWatchlistItems((prev) =>
          prev.filter((entry) => entry.itemId !== itemId),
        );
      } else {
        await fetch("http://localhost:5001/api/watchlist", {
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
        setWatchlistItems((prev) => [
          ...prev,
          {
            itemId,
            title: item.title,
            price_nzd: item.price_nzd,
            location: item.location,
            category,
          },
        ]);
      }
    } catch (err) {
      console.error("Watchlist toggle failed:", err);
    }
  };

  //Function to remove an item from the watchlist
  const removeFromWatchlist = async (itemId) => {
    try {
      await fetch(`http://localhost:5001/api/watchlist/${itemId}`, {
        method: "DELETE",
      });
      setWatchlistIds((prev) => {
        const next = new Set(prev);
        next.delete(itemId);
        return next;
      });
      setWatchlistItems((prev) =>
        prev.filter((entry) => entry.itemId !== itemId),
      );
    } catch (err) {
      console.error("Failed to remove from watchlist:", err);
    }
  };

  return {
    watchlistIds,
    watchlistItems,
    toggleWatchlist,
    removeFromWatchlist,
  };
}
