import styles from "./WatchlistPanel.module.css";

export default function WatchlistPanel({ items, onRemove, onClose }) {
  return (
    <>
      <div className={styles.overlay} onClick={onClose} />

      <div className={styles.panel}>
        <div className={styles.header}>
          <h2>Watchlist ({items.length})</h2>
        </div>

        {items.length === 0 ? (
          <p className={styles.empty}>No items saved yet.</p>
        ) : (
          <div className={styles.list}>
            {items.map((item) => (
              <div key={item.itemId} className={styles.listItem}>
                <div className={styles.itemInfo}>
                  <span className={styles.itemTitle}>{item.title}</span>
                  {typeof item.price_nzd === "number" && (
                    <span className={styles.itemPrice}>
                      ${item.price_nzd.toLocaleString("en-NZ")}
                    </span>
                  )}
                </div>

                <button
                  className={styles.removeButton}
                  aria-label="Remove from watchlist"
                  onClick={() => onRemove(item.itemId)}
                >
                  ✕
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}
