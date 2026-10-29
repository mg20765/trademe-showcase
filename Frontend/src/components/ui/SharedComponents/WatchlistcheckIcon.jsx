export default function WatchlistCheckIcon({ onClick }) {
  return (
    <button
      onClick={onClick}
      className="watchlist-button"
      aria-label="Remove from watchlist"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="39"
        height="39"
        viewBox="0 0 39 39"
        fill="none"
      >
        <path
          d="M38.6816 33.6876C38.6816 35.4671 36.5321 36.3605 35.2708 35.1051L3.43359 3.41753C2.16908 2.15897 3.06039 -3.11411e-06 4.84447 -2.95814e-06L36.6816 -3.98954e-06C37.7862 -3.89298e-06 38.6816 0.895428 38.6816 2L38.6816 33.6876Z"
          fill="#FFC041"
        />
        <path
          d="M11 20L16.5 25.5L28 14"
          stroke="black"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
}
