import styles from "./PlaceBidModal.module.css";
import PlaceBidButton from "../PlaceBidButton";

export default function BidModal({ listing, bidAmount, setBidAmount, onClose, onContinue }) {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        <h2>Place a Bid</h2>

        <img src={listing.images?.[0] || "/placeholder.jpg"} alt={listing.title} className={styles.listingImage} />
        <p className={styles.subtitle}>
          Current bid:{" "}
          <strong>
            {listing.price_nzd.toLocaleString("en-NZ", {
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

            <input id="bidAmount" type="number" min={listing.price_nzd + 1} step="1" value={bidAmount} onChange={(e) => setBidAmount(Number(e.target.value))} className={styles.bidInput} />
          </div>

          <div className={styles.autoBidInline}>
            <span className={styles.autoBidLabel}>Auto-bid</span>
            <button className={styles.moreInfo}>More Info</button>

            <label className={styles.toggleWrapper}>
              <input type="checkbox" />
              <span className={styles.toggle}></span>
            </label>
          </div>
        </div>

        {/* --- shipping info section --- */}
        <div>
          <div className={styles.sectionHeader}>Shipping</div>
          <div className={styles.shippingBox}>Free shipping within New Zealand</div>
        </div>

        {/* --- PAYMENT --- */}
        <div>
          <div className={styles.sectionHeader}>Seller accepts payment by</div>
          <div className={styles.paymentBox}>
            Ping
            <small>If you win, you are legally obligated to complete your purchase.</small>
          </div>
        </div>

        {/* --- Email reminder tick box --- */}
        <div className={styles.remindersRow}>
          <input type="checkbox" id="outbidReminder" />
          <label htmlFor="outbidReminder">Email me if I'm outbid</label>
        </div>

        {/* --- placebid button and back to listing --- */}
        <div className={styles.buttonRow}>
          <PlaceBidButton className={styles.placeBidButton} onClick={onContinue} style={{ backgroundColor: "#2878d8" }} />

          <button className={styles.goBackLink} onClick={onClose}>
            Go back to listing
          </button>
        </div>
      </div>
    </div>
  );
}
