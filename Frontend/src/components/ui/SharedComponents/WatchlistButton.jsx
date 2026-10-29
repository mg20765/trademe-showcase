export default function WatchlistButton({ onClick, showBackground = true }) {
  return (
    <button
      onClick={onClick}
      className="watchlist-button"
      aria-label="Add to watchlist"
      // This style inline block activates to be able to pass showBackground={false} where needed
      style={!showBackground ? { background: "none", border: "none", padding: 0 } : {}}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="39" height="39" viewBox="0 0 39 39" fill="none">
        {/* Show's yellow background by default! */}
        {showBackground && <path d="M38.6816 33.6876C38.6816 35.4671 36.5321 36.3605 35.2708 35.1051L3.43359 3.41753C2.16908 2.15897 3.06039 -3.11411e-06 4.84447 -2.95814e-06L36.6816 -3.98954e-06C37.7862 -3.89298e-06 38.6816 0.895428 38.6816 2L38.6816 33.6876Z" fill="#FFC041" />}
        <path
          d="M20.736 9.24476L24.3841 12.8891M27.1201 15.6224L30.7682 19.2667M21.648 15.6224L18 11.978L24.1561 5.80997C25.5093 4.59943 27.2753 3.9527 29.0912 4.0027C30.907 4.05269 32.6347 4.79561 33.9191 6.07878C35.2036 7.36194 35.9473 9.08786 35.9973 10.9018C36.0473 12.7158 35.4 14.48 34.1882 15.8319L28.0321 22L24.3841 18.3556L30.2118 12.5611C30.4993 12.1858 30.6406 11.719 30.6093 11.2475C30.5781 10.7759 30.3764 10.3318 30.0419 9.9976C29.7074 9.66343 29.2628 9.46201 28.7908 9.43079C28.3188 9.39957 27.8515 9.54068 27.4758 9.82787L21.648 15.6224Z"
          stroke="black"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path d="M12.7222 1H14.2778V8H12.7222V1Z" fill="black" />
        <path d="M17 3.72222V5.27778H10L10 3.72222L17 3.72222Z" fill="black" />
      </svg>
    </button>
  );
}
