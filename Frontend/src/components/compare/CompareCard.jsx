import { useState } from "react";
import WatchlistButton from "../ui/SharedComponents/WatchlistButton";
import PlaceBidButton from "../ui/SharedComponents/PlaceBidButton";
import BidModal from "../ui/SharedComponents/PlaceBidModal/PlaceBidModal";
import styles from "./CompareCard.module.css";

export default function CompareCard({ product, onRemove }) {
  const [expanded, setExpanded] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [bidAmount, setBidAmount] = useState(product.price_nzd + 1);

  return (
    <div className={styles.card}>
      {/* Header — watchlist + remove */}
      <div className={styles.cardHeader}>
        <WatchlistButton />
        <button className={styles.removeButton} onClick={onRemove}>
          ✕
        </button>
      </div>

      {/* Product image */}
      {product.images && product.images.length > 0 ? (
        <img
          src={product.images[0]}
          alt={product.title}
          className={styles.image}
        />
      ) : (
        <div className={styles.imagePlaceholder} />
      )}

      {/* Arrow button — mobile only */}
      <button
        className={styles.expandButton}
        onClick={() => setExpanded(!expanded)}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 0.2s",
          }}
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </button>

      {/* Product details */}
      <div className={`${styles.body} ${expanded ? styles.expanded : ""}`}>
        <p className={styles.descriptionHeading}>Description</p>
        <p className={styles.title}>{product.title || "No title"}</p>

        {product.description && (
          <p className={styles.description}>{product.description}</p>
        )}

        <p className={styles.detail}>
          <span>Price: </span>
          {product.price_nzd ? `$${product.price_nzd}` : "—"}
          {typeof product.price === "number"
            ? currencyFormatter.format(product.price)
            : "—"}
        </p>

        <p className={styles.detail}>
          <span>Condition: </span>
          {product.condition || "—"}
        </p>

        <p className={styles.detail}>
          <span>Specs: </span>
          {product.specs || "—"}
        </p>

        {/* 2. Render a normal button in the footer to trigger the modal */}
        <div className={styles.footer}>
          <PlaceBidButton onClick={() => setShowModal(true)} />
        </div>
      </div>
      {showModal && (
        <BidModal
          listing={product}
          bidAmount={bidAmount}
          setBidAmount={setBidAmount}
          onClose={() => setShowModal(false)}
          onContinue={() => {
            setShowModal(false);
          }}
        />
      )}
    </div>
  );
}
