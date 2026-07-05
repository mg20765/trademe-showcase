import styles from "./ListingInfo.module.css";
import mockListing from "../mockListing";

export default function ListingInfo({ onCompare }) {
  const listing = mockListing;

  return (
    <section className={styles.container}>
      {/* === Header === */}

      <div className={styles.header}>
        <div className={styles.headerTop}>
          <h1>{listing.title}</h1>

          <div className={styles.actions}>
            <button>❤ Watchlist</button>
            <button onClick={onCompare}>⇄ Compare</button>
          </div>
        </div>

        <p>Listed: {listing.listedDate}</p>

        <p>Closing: {listing.closingDate}</p>

        <p>
          Listed by:
          <strong> {listing.seller}</strong>
        </p>
      </div>

      {/* === Pricing === */}

      <div className={styles.pricing}>
        <div className={styles.priceCard}>
          <h3>Current Bid</h3>
          <h2>{listing.currentBid}</h2>

          <button className={styles.bidButton}>Place Bid</button>
        </div>

        <div className={styles.priceCard}>
          <h3>Buy Now</h3>
          <h2>{listing.buyNow}</h2>

          <button className={styles.buyButton}>Buy Now</button>
        </div>
      </div>

      {/* === Details === */}

      <div className={styles.section}>
        <h2>Details</h2>

        <div className={styles.detailsGrid}>
          {listing.details.map((detail) => (
            <div key={detail.label} className={styles.detailRow}>
              <span>{detail.label}</span>
              <span>{detail.value}</span>
            </div>
          ))}
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
