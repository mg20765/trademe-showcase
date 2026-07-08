import { useState } from "react";
import styles from "./BidConfirmationModal.module.css";

export default function BidConfirmationModal({ bidAmount, onCancel, onConfirm }) {
  const [accepted, setAccepted] = useState(false);

  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onCancel}>
          ✕
        </button>

        <h2>Confirm Your Bid</h2>

        <p>Please review your bid before continuing.</p>

        <div className={styles.bidAmount}>
          {bidAmount.toLocaleString("en-NZ", {
            style: "currency",
            currency: "NZD",
          })}
        </div>

        <label className={styles.checkboxRow}>
          <input type="checkbox" checked={accepted} onChange={(e) => setAccepted(e.target.checked)} />

          <span>I have read and accept the Terms & Conditions and understand that my bid is legally binding if successful.</span>
        </label>

        <div className={styles.buttonRow}>
          <button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>

          <button className={styles.placeBidButton} disabled={!accepted} onClick={onConfirm}>
            Place Bid
          </button>
        </div>
      </div>
    </div>
  );
}
