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

import Header from "../HomePage/HomeComponents/Header.jsx";
import Footer from "../HomePage/HomeComponents/Footer.jsx";
import { useCompare } from "../../components/Context/CompareContext.jsx";
import PageAds from "./PageAds/PageAds.jsx";

export default function ListingPage() {
  // The bidding and buy now modals
  const [listing, setListing] = useState(null);

  // The bidding and buy now modals
  const [showBidModal, setShowBidModal] = useState(false);
  const [showBidConfirmation, setShowBidConfirmation] = useState(false);

  // Start at 0, update once listing loads
  const [bidAmount, setBidAmount] = useState(0);

  const { id } = useParams();

  // Compare Popup
  const [showCompare, setShowCompare] = useState(false);
  const { addToCompare } = useCompare();
  const handleCompare = () => {
    addToCompare(listing);
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

  // Set bidAmount once listing is available
  useEffect(() => {
    if (listing) {
      setBidAmount(listing.price_nzd + 1);
    }
  }, [listing]);

  if (!listing) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <main className={styles.page}>
        <Header />
        <div className={styles.topSection}>
          <div className={styles.listingImage}>
            <ListingGallery listing={listing} />
          </div>

          <div className={styles.listingInfo}>
            <ListingInfo listing={listing} onCompare={handleCompare} onPlaceBid={() => setShowBidModal(true)} />
          </div>
        </div>
        <Questions questions={listing.questions} />
        <SimilarListings listings={listing.similarListings} />
        <PageAds />
        <Footer />
        {showCompare && <ComparePopUp />}{" "}
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
