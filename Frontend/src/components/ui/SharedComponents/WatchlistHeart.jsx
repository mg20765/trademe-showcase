import { useState } from "react";

// Toggles between saved/unsaved state - visual only, no watchlist API
export default function WatchlistHeart() {
  const [saved, setSaved] = useState(false);

  return (
    <div
      onClick={() => setSaved(!saved)}
      style={{
        cursor: "pointer",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={saved ? "#e8a0a0" : "none"}
        stroke="black"
        strokeWidth="2"
      >
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
      </svg>
      <span style={{ fontSize: "11px" }}>Watchlist</span>
    </div>
  );
}
