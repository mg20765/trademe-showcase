import styles from "./ListingInfo.module.css";

export default function ListingInfo() {
  return (
    <section className={styles.container}>
      {/* === Header === */}

      <div className={styles.header}>
        <h1 className={styles.title}>Bookshelf, HomeMart - A</h1>

        <p className={styles.date}>Listed: Wednesday 16 June</p>

        <p className={styles.date}>Closes: Friday 26 June, 9:00am</p>

        <p className={styles.seller}>
          Listed by <strong>JohnHalo117</strong>
        </p>
      </div>

      {/* ==== Actions ==== */}

      <div className={styles.actions}>
        <button>❤ Watchlist</button>

        <button>⇄ Compare</button>
      </div>

      {/* === Pricing === */}

      <div className={styles.pricing}>
        <div className={styles.priceCard}>
          <h3>Current Bid</h3>
          <h2>$200.00</h2>

          <button className={styles.bidButton}>Place Bid</button>
        </div>

        <div className={styles.priceCard}>
          <h3>Buy Now</h3>
          <h2>$249.00</h2>

          <button className={styles.buyButton}>Buy Now</button>
        </div>
      </div>

      {/* === Details === */}

      <div className={styles.section}>
        <h2>Details</h2>

        <div className={styles.detailsGrid}>
          <span>Dimensions</span>
          <span>80 × 29 × 175 cm</span>

          <span>Weight</span>
          <span>34kg</span>

          <span>Condition</span>
          <span>New</span>

          <span>Material</span>
          <span>Wood / Metal</span>

          <span>Finish</span>
          <span>Wood-look Melamine</span>

          <span>Colour</span>
          <span>Walnut</span>
        </div>
      </div>

      {/* === Seller Summary === */}

      <div className={styles.section}>
        <h2>Seller's Summary</h2>

        <ul>
          <li>Contemporary and simple style</li>

          <li>Strong and durable construction</li>

          <li>Made with wood and black metal accents</li>

          <li>Suitable for home office or living room</li>
        </ul>
      </div>
    </section>
  );
}
