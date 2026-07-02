import styles from "./ListingPage.module.css";

import ListingGallery from "./ListingGallery/ListingGallery";
import ListingInfo from "./ListingInfo/ListingInfo";

export default function ListingPage() {
  return (
    <>
      <main className={styles.page}>
        <div className={styles.topSection}>
          <div className={styles.listingImage}>
            <ListingGallery />
          </div>

          <div className={styles.listingInfo}>
            <ListingInfo />
          </div>
        </div>

        <div className={styles.listingQuestions}>Questions & Answers</div>

        <div className={styles.similarListing}>Similar Listings Available</div>
      </main>
    </>
  );
}
