import { useCompare } from "../../../components/Context/CompareContext";
import { Link } from "react-router-dom";

import styles from "./SimilarListings.module.css";

import CompareButton from "../../../components/ui/SharedComponents/CompareButton-sml";
import WatchlistButton from "../../../components/ui/SharedComponents/WatchlistButton";

export default function SimilarListings({ listings = [] }) {
  const { addToCompare } = useCompare();
  return (
    <section className={styles.container}>
      <h2>Similar Listings Available</h2>

      <div className={styles.grid}>
        {listings.map((item) => (
          <Link key={item.item_num} to={`/listing/${item.item_num}`} className={styles.card}>
            <div className={styles.imageContainer}>
              <img src={item.images?.[0] || "/placeholder.jpg"} alt={item.title} className={styles.image} />

              <div className={styles.imageButtons}>
                <WatchlistButton
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    console.log("watchlist", item);
                  }}
                />
                <CompareButton
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    addToCompare(item);
                  }}
                />
              </div>
            </div>
            <h3>{item.title}</h3>

            <p>{item.location}</p>

            <p className={styles.price}>
              {item.price_nzd.toLocaleString("en-NZ", {
                style: "currency",
                currency: "NZD",
              })}
            </p>
          </Link>
        ))}
      </div>
    </section>
  );
}
