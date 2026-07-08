import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";

import styles from "./ListingPage.module.css";
import ComparePopUp from "../../components/ui/SharedComponents/ComparePopUp/ComparePopUp";

import ListingGallery from "./ListingGallery/ListingGallery";
import ListingInfo from "./ListingInfo/ListingInfo";
import Questions from "./ListingQuestions/ListingQuestions";
import SimilarListings from "./SimilarListings/SimilarListings";
import PlaceBidModal from "../../components/ui/SharedComponents/PlaceBidModal/PlaceBidModal.jsx";
import BidConfirmationModal from "../../components/ui/SharedComponents/BidConfirmationModal/BidConfirmationModal.jsx";

export default function ListingPage() {
  // The bidding and buy now modals
  const [showBidModal, setShowBidModal] = useState(false);
  const [showBidConfirmation, setShowBidConfirmation] = useState(false);
  const [bidAmount, setBidAmount] = useState(0);

  const { id } = useParams();
  const [listing, setListing] = useState(null);

  // Compare Popup
  const [showCompare, setShowCompare] = useState(false);
  const handleCompare = () => {
    setShowCompare(true);
  };
  useEffect(() => {
    fetch(`http://localhost:5001/api/listings/${id || 1}`)
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
          <ListingInfo listing={listing} onCompare={handleCompare} onPlaceBid={() => setShowBidModal(true)} />{" "}
        </div>

        <Questions questions={listing.questions} />

        <SimilarListings listings={listing.similarListings} />
        {showCompare && <ComparePopUp />}

        {showBidModal && (
          <PlaceBidModal
            listing={listing}
            bidAmount={bidAmount}
            setBidAmount={setBidAmount}
            onClose={() => setShowBidModal(false)}
            onContinue={() => {
              setShowBidModal(false);
              setShowBidConfirmation(true);
            }}
          />
        )}

        {showBidConfirmation && (
          <BidConfirmationModal
            bidAmount={bidAmount}
            onCancel={() => {
              setShowBidConfirmation(false);
              setShowBidModal(true);
            }}
            onConfirm={() => {
              console.log("Bid submitted!");
              setShowBidConfirmation(false);
            }}
          />
        )}
      </main>
    </>
  );
}
