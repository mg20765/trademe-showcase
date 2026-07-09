import { useState, useEffect } from "react";
import styles from "./ListingGallery.module.css";

import LeftArrow from "../../../assets/LeftArrow.svg";
import RightArrow from "../../../assets/RightArrow.svg";
import ImageZoom from "./ImageZoom";

export default function ListingGallery({ listing }) {
  const galleryImages = listing.images || [];

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [imageZoomOpen, setImageZoomOpen] = useState(false);

  useEffect(() => {
    if (galleryImages.length > 0) {
      setSelectedIndex(0);
    }
  }, [galleryImages]);

  if (galleryImages.length === 0) {
    return <p>No images available.</p>;
  }

  const showPreviousImage = () => {
    setSelectedIndex((prev) => (prev === 0 ? galleryImages.length - 1 : prev - 1));
  };

  const showNextImage = () => {
    setSelectedIndex((prev) => (prev === galleryImages.length - 1 ? 0 : prev + 1));
  };

  return (
    <>
      <div className={styles.gallery}>
        <div className={styles.mainImageContainer}>
          <img src={galleryImages[selectedIndex]} alt="Listing" className={styles.mainImage} onClick={() => setImageZoomOpen(true)} />

          <button className={`${styles.arrowButton} ${styles.leftArrow}`} onClick={showPreviousImage}>
            <img src={LeftArrow} alt="Previous image" />
          </button>

          <button className={`${styles.arrowButton} ${styles.rightArrow}`} onClick={showNextImage}>
            <img src={RightArrow} alt="Next image" />
          </button>
        </div>

        <div className={styles.thumbnailRow}>
          {galleryImages.map((image, index) => (
            <img key={index} src={image} alt={`Thumbnail ${index + 1}`} className={`${styles.thumbnail} ${selectedIndex === index ? styles.activeThumbnail : ""}`} onClick={() => setSelectedIndex(index)} />
          ))}
        </div>
      </div>

      <ImageZoom open={imageZoomOpen} images={galleryImages} currentIndex={selectedIndex} onClose={() => setImageZoomOpen(false)} onChangeImage={setSelectedIndex} />
    </>
  );
}
