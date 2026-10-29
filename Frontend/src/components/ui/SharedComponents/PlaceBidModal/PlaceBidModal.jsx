import styles from "./PlaceBidModal.module.css";

export default function BidModal({
  listing,
  bidAmount,
  setBidAmount,
  onClose,
  onContinue,
  // Added suggested props for checkbox state management
  autoBid = false,
  setAutoBid = () => {},
  remindMe = true,
  setRemindMe = () => {},
}) {
  // Safety check for listing object
  if (!listing) return null;

  const currentPrice = listing.price_nzd || 0;

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button
          className={styles.closeButton}
          onClick={onClose}
          aria-label="Close modal"
        >
          ✕
        </button>

        <h2>Place a Bid</h2>

        <img src={listing.images?.[0] || "/placeholder.jpg"} alt={listing.title} className={styles.listingImage} />
        <p className={styles.subtitle}>
          Current bid:{" "}
          <strong>
            {currentPrice.toLocaleString("en-NZ", {
              style: "currency",
              currency: "NZD",
            })}
          </strong>
        </p>

        {/* --- BID  --- */}
        <div className={styles.bidRow}>
          <div className={styles.bidInputGroup}>
            <label htmlFor="bidAmount" className={styles.bidInputLabel}>
              Your bid
            </label>

            <input
              id="bidAmount"
              type="number"
              min={currentPrice + 1}
              step="1"
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              className={styles.bidInput}
            />
          </div>

          <div className={styles.autoBidInline}>
            <span className={styles.autoBidLabel}>Auto-bid</span>
            <button type="button" className={styles.moreInfo}>
              More Info
            </button>

            <label className={styles.toggleWrapper}>
              <input
                type="checkbox"
                checked={autoBid}
                onChange={(e) => setAutoBid(e.target.checked)}
              />
              <span className={styles.toggle}></span>
            </label>
          </div>
        </div>

        {/* --- shipping info section --- */}
        <div>
          <div className={styles.sectionHeader}>Shipping</div>
          <div className={styles.shippingBox}>
            Free shipping within New Zealand
          </div>
        </div>

        {/* --- PAYMENT --- */}
        <div>
          <div className={styles.sectionHeader}>Seller accepts payment by</div>
          <div className={styles.paymentBox}>
            Ping
            <small>
              If you win, you are legally obligated to complete your purchase.
            </small>
          </div>
        </div>

        {/* --- Email reminder tick box --- */}
        <div className={styles.remindersRow}>
          <input
            type="checkbox"
            id="outbidReminder"
            checked={remindMe}
            onChange={(e) => setRemindMe(e.target.checked)}
          />
          <label htmlFor="outbidReminder">Email me if I'm outbid</label>
        </div>

        {/* --- placebid button and back to listing --- */}
        <div className={styles.buttonRow}>
          <button
            type="button"
            className={styles.placeBidButton}
            onClick={onContinue}
            style={{
              backgroundColor: "#2878d8",
              color: "white",
              border: "none",
              padding: "10px 20px",
              borderRadius: "4px",
              cursor: "pointer",
            }}
          >
            Place Bid
          </button>

          <button type="button" className={styles.goBackLink} onClick={onClose}>
            Go back to listing
          </button>
        </div>
      </div>
    </div>
  );
}
