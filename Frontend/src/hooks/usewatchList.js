import { useState, useEffect } from "react";

// fetch only fails when the network is down. If the server answers "500" it still
// counts as a reply, so check the answer before changing what the screen shows.
async function send(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) throw new Error(`Server answered ${res.status}`);
  return res;
}

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
        await send(`http://localhost:5001/api/watchlist/${itemId}`, {
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
        await send("http://localhost:5001/api/watchlist", {
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
      await send(`http://localhost:5001/api/watchlist/${itemId}`, {
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
