import styles from "./SimilarListings.module.css";

export default function SimilarListings({ listings = [] }) {
  return (
    <section className={styles.container}>
      <h2>Similar Listings Available</h2>

      <div className={styles.grid}>
        {listings.map((listing) => (
          <div key={listing.item_num} className={styles.card}>
            <img src={listing.images?.[0] || "/placeholder.jpg"} alt={listing.title} className={styles.image} />

            <h3>{listing.title}</h3>

            <p>{listing.location}</p>

            <p className={styles.price}>
              {listing.price_nzd.toLocaleString("en-NZ", {
                style: "currency",
                currency: "NZD",
              })}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
