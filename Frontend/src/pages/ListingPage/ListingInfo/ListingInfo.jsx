import styles from "./ListingInfo.module.css";

export default function ListingInfo({ listing, onCompare }) {
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

        <p>Closes: {listing.closingDate}</p>

        <p>
          Listed by:
          <strong> {listing.seller}</strong>
        </p>
      </div>

      {/* === Pricing === */}

      <div className={styles.pricing}>
        <div className={styles.priceCard}>
          <h3>Current Bid</h3>
          <h2>
            {listing.price_nzd.toLocaleString("en-NZ", {
              style: "currency",
              currency: "NZD",
            })}
          </h2>{" "}
          <button className={styles.bidButton}>Place Bid</button>
        </div>

        <div className={styles.priceCard}>
          <h3>Buy Now</h3>
          <h2>
            {listing.buyNow.toLocaleString("en-NZ", {
              style: "currency",
              currency: "NZD",
            })}
          </h2>

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
          {listing.summary.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
