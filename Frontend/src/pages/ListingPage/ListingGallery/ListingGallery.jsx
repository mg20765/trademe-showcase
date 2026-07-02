import styles from "./ListingGallery.module.css";

export default function ListingGallery() {
  const thumbnails = [1, 2, 3];

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImage}>Main Product Image</div>

      <div className={styles.thumbnailRow}>
        {thumbnails.map((thumbnail) => (
          <div key={thumbnail} className={styles.thumbnail}>
            {thumbnail}
          </div>
        ))}
      </div>
    </div>
  );
}
