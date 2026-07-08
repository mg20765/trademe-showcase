import styles from "./PlaceBidModal.module.css";

export default function BidModal({ listing, bidAmount, setBidAmount, onClose, onContinue }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        <h2>Place a Bid</h2>

        <p className={styles.subtitle}>
          Current bid:
          <strong>
            {" "}
            {listing.price_nzd.toLocaleString("en-NZ", {
              style: "currency",
              currency: "NZD",
            })}
          </strong>
        </p>

        <label htmlFor="bidAmount">Your bid</label>

        <input id="bidAmount" type="number" min={listing.price_nzd + 1} step="1" value={bidAmount} onChange={(e) => setBidAmount(Number(e.target.value))} placeholder="Enter your bid" />

        <div className={styles.buttonRow}>
          <button className={styles.cancelButton} onClick={onClose}>
            Cancel
          </button>

          <button className={styles.placeBidButton} disabled={bidAmount <= listing.price_nzd} onClick={onContinue}>
            Place Bid
          </button>
        </div>
      </div>
    </div>
  );
}
