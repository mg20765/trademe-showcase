import WatchlistHeart from "../ui/SharedComponents/WatchlistHeart";
import PlaceBidButton from "../ui/SharedComponents/PlaceBidButton";
import styles from "./CompareCard.module.css";

export default function CompareCard({ product, onRemove }) {
  return (
    <div className={styles.card}>
      {/* Header — watchlist + remove */}
      <div className={styles.cardHeader}>
        <WatchlistHeart />
        <button className={styles.removeButton} onClick={onRemove}>
          ✕
        </button>
      </div>

      {/* Product image */}
      {product.imageUrl ? (
        <img
          src={product.imageUrl}
          alt={product.title}
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
          {product.price ? `$${product.price}` : "—"}
        </p>

        <p className={styles.detail}>
          <span>Condition: </span>
          {product.condition || "—"}
        </p>

        <p className={styles.detail}>
          <span>Specs: </span>
          {product.specs || "—"}
        </p>

        {/* Place Bid button */}
        <div className={styles.footer}>
          <PlaceBidButton
            onClick={() => console.log("Place bid:", product._id)}
          />
        </div>
      </div>
    </div>
  );
}
