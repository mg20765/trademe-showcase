import styles from "./SimilarListings.module.css";

export default function SimilarListings({ listings = [] }) {
  return (
    <section className={styles.container}>
      <h2>Similar Listings Available</h2>

      <div className={styles.grid}>
        {listings.map((item) => (
          <div key={item.item_num} className={styles.card}>
            <img src={item.images?.[0] || "/placeholder.jpg"} alt={item.title} className={styles.image} />

            <h3>{item.title}</h3>

            <p>{item.location}</p>

            <p className={styles.price}>
              {item.price_nzd.toLocaleString("en-NZ", {
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
