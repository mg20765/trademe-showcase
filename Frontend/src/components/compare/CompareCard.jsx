import { useState } from "react";
import WatchlistHeart from "../ui/SharedComponents/WatchlistHeart";
import PlaceBidModal from "../ui/SharedComponents/PlaceBidModal/PlaceBidModal";
import styles from "./CompareCard.module.css";

export default function CompareCard({ product = {}, onRemove }) {
  // 1. Create a state to track if the modal is open
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Formatter for currency
  const currencyFormatter = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
  });

  return (
    <div className={styles.card}>
      {/* Header — watchlist + remove */}
      <div className={styles.cardHeader}>
        <WatchlistHeart />
        <button
          className={styles.removeButton}
          onClick={() => onRemove?.()}
          aria-label={`Remove ${product.title || "item"} from comparison`}
        >
          ✕
        </button>
      </div>

      {/* Product image */}
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.title || "Product image"}
          className={styles.image}
        />
      ) : (
        <div className={styles.imagePlaceholder} />
      )}

      {/* Product details */}
      <div className={styles.body}>
        <p className={styles.title}>{product.title || "No title"}</p>

        {product.description && (
          <p className={styles.description}>{product.description}</p>
        )}

        <p className={styles.detail}>
          <span>Price: </span>
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
          <button
            className={styles.bidButton || styles.button} // Uses their card styles
            onClick={() => setIsModalOpen(true)}
          >
            Place Bid
          </button>
        </div>
      </div>

      {/* 3. Render the actual modal overlay safely at the root level if open */}
      {isModalOpen && (
        <PlaceBidModal
          productId={product._id}
          bidAmount={product.price}
          onClose={() => setIsModalOpen(false)}
          onContinue={() => {
            console.log("Bid submitted for:", product._id);
            setIsModalOpen(false); // Close modal on success
          }}
        />
      )}
    </div>
  );
}
