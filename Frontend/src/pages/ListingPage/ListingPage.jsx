import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./ListingPage.module.css";

import ListingGallery from "./ListingGallery/ListingGallery";
import ListingInfo from "./ListingInfo/ListingInfo";
import ComparePopUp from "../../components/ui/SharedComponents/ComparePopUp/ComparePopUp";
import Questions from "./ListingQuestions/ListingQuestions";
import SimilarListings from "./SimilarListings/SimilarListings";

export default function ListingPage() {
  const { id } = useParams();
  const [listing, setListing] = useState(null);

  const [showCompare, setShowCompare] = useState(false);
  const handleCompare = () => {
    setShowCompare(true);
  };
  useEffect(() => {
    fetch(`http://localhost:3000/api/listings/${id || 1}`)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setListing(data);
      })
      .catch((err) => console.error(err));
  }, [id]);

  if (!listing) {
    return <p>Loading...</p>;
  }
  return (
    <>
      <main className={styles.page}>
        <div className={styles.topSection}>
          <div className={styles.listingImage}>
            <ListingGallery listing={listing} />
          </div>

          <ListingInfo listing={listing} onCompare={handleCompare} />
        </div>

        <Questions questions={listing.questions} />

        <SimilarListings listings={listing.similarListings} />
        {showCompare && <ComparePopUp />}
      </main>
    </>
  );
}
