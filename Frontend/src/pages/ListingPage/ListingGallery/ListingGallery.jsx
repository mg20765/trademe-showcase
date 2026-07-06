import { useState } from "react";
import styles from "./ListingGallery.module.css";

import LeftArrow from "../../../assets/LeftArrow.svg";
import RightArrow from "../../../assets/RightArrow.svg";

export default function ListingGallery({ listing }) {
  const galleryImages = ["/bookshelf1.jpg", "/bookshelf2.jpg", "/bookshelf3.jpg", "/bookshelf4.jpg"];
  const [selectedImage, setSelectedImage] = useState(galleryImages[0]);

  const showPreviousImage = () => {
    const currentIndex = galleryImages.indexOf(selectedImage);

    const previousIndex = currentIndex === 0 ? galleryImages.length - 1 : currentIndex - 1;

    setSelectedImage(galleryImages[previousIndex]);
  };

  const showNextImage = () => {
    const currentIndex = galleryImages.indexOf(selectedImage);

    const nextIndex = currentIndex === galleryImages.length - 1 ? 0 : currentIndex + 1;

    setSelectedImage(galleryImages[nextIndex]);
  };

  return (
    <div className={styles.gallery}>
      <div className={styles.mainImageContainer}>
        <img src={selectedImage} alt="Listing" className={styles.mainImage} />

        <button className={`${styles.arrowButton} ${styles.leftArrow}`} onClick={showPreviousImage}>
          <img src={LeftArrow} alt="Previous image" />
        </button>

        <button className={`${styles.arrowButton} ${styles.rightArrow}`} onClick={showNextImage}>
          <img src={RightArrow} alt="Next image" />
        </button>
      </div>

      <div className={styles.thumbnailRow}>
        {galleryImages.map((image, index) => (
          <img key={index} src={image} alt={`Thumbnail ${index + 1}`} className={`${styles.thumbnail} ${selectedImage === image ? styles.activeThumbnail : ""}`} onClick={() => setSelectedImage(image)} />
        ))}
      </div>
    </div>
  );
}
