import { useState } from "react";
import styles from "./ListingPage.module.css";

import ListingGallery from "./ListingGallery/ListingGallery";
import ListingInfo from "./ListingInfo/ListingInfo";
import ComparePopUp from "../../components/ui/SharedComponents/ComparePopUp/ComparePopUp";

export default function ListingPage() {
  const [showCompare, setShowCompare] = useState(false);
  return (
    <>
      <main className={styles.page}>
        <div className={styles.topSection}>
          <div className={styles.listingImage}>
            <ListingGallery />
          </div>

          <div className={styles.listingInfo}>
            <ListingInfo onCompare={() => setShowCompare(true)} />
          </div>
        </div>

        <div className={styles.listingQuestions}>Questions & Answers</div>

        <div className={styles.similarListing}>Similar Listings Available</div>

        {showCompare && <ComparePopUp />}
      </main>
    </>
  );
}
