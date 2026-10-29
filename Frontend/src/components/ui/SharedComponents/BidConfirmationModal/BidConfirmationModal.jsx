import { useState } from "react";
import styles from "./BidConfirmationModal.module.css";
import PlaceBidButton from "../PlaceBidButton.jsx";

export default function BidConfirmationModal({
  bidAmount,
  onCancel,
  onConfirm,
}) {
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
          <input
            type="checkbox"
            checked={accepted}
            onChange={(e) => setAccepted(e.target.checked)}
          />

          <span>
            I have read and accept the Terms & Conditions and understand that my
            bid is legally binding if successful.
          </span>
        </label>

        <div className={styles.buttonRow}>
          <PlaceBidButton
            className={styles.placeBidButton}
            disabled={!accepted}
            onClick={onConfirm}
            /* Pass inline overrides dynamically based on the 'accepted' state */
            style={
              !accepted
                ? {
                    backgroundColor: "#c7c7c7",
                    color: "#777",
                    cursor: "not-allowed",
                  }
                : { backgroundColor: "#2878d8" }
            }
          />

          <button className={styles.cancelButton} onClick={onCancel}>
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
