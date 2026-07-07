import useCompare from "../hooks/useCompare";
import CompareCard from "../components/compare/CompareCard";
import CompareEmpty from "../components/compare/CompareEmpty";
import styles from "./ComparePage.module.css";

export default function ComparePage() {
  const { products, loading, error, handleRemove, handleClear } = useCompare();

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className={styles.container}>
      {/* Breadcrumb */}
      <p className={styles.breadcrumb}>
        <a href="/" className={styles.breadcrumbLink}>
          Home
        </a>
        {" / All Categories"}
      </p>

      {/* Header */}
      <div className={styles.header}>
        {products.length > 0 && (
          <button className={styles.clearButton} onClick={handleClear}>
            Clear All
          </button>
        )}
      </div>

      {/* Empty state */}
      {products.length === 0 ? (
        <CompareEmpty />
      ) : (
        <div className={styles.carousel}>
          {products.map((product) => (
            <CompareCard
              key={product._id}
              product={product}
              onRemove={() => handleRemove(product._id)}
            />
          ))}

          {/* Add more button (displays if less than 8 products) */}
          {products.length < 8 && (
            <div className={styles.addButtonWrapper}>
              <a href="/category" className={styles.addButton}>
                +
              </a>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
