import { useState } from "react";
import styles from "./ListingGallery.module.css";

import LeftArrow from "../../../assets/LeftArrow.svg";
import RightArrow from "../../../assets/RightArrow.svg";

import mockGallery from "./mockGallery";

export default function ListingGallery() {
  const [selectedImage, setSelectedImage] = useState(mockGallery[0]);

  const showPreviousImage = () => {
    const currentIndex = mockGallery.findIndex((photo) => photo.id === selectedImage.id);

    const previousIndex = currentIndex === 0 ? mockGallery.length - 1 : currentIndex - 1;

    setSelectedImage(mockGallery[previousIndex]);
  };

  const showNextImage = () => {
    const currentIndex = mockGallery.findIndex((photo) => photo.id === selectedImage.id);

    const nextIndex = currentIndex === mockGallery.length - 1 ? 0 : currentIndex + 1;

    setSelectedImage(mockGallery[nextIndex]);
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageContainer}>
        <img src={selectedImage.image} alt="Listing" className={styles.mainImage} />

        <button className={`${styles.arrowButton} ${styles.leftArrow}`} onClick={showPreviousImage}>
          <img src={LeftArrow} alt="Previous image" />
        </button>

        <button className={`${styles.arrowButton} ${styles.rightArrow}`} onClick={showNextImage}>
          <img src={RightArrow} alt="Next image" />
        </button>
      </div>

      <div className={styles.thumbnailRow}>
        {mockGallery.map((photo) => (
          <img key={photo.id} src={photo.image} alt={`Thumbnail ${photo.id}`} className={`${styles.thumbnail} ${selectedImage.id === photo.id ? styles.activeThumbnail : ""}`} onClick={() => setSelectedImage(photo)} />
        ))}
      </div>
    </div>
  );
}
