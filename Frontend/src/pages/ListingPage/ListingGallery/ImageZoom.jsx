import { useEffect } from "react";
import styles from "./ImageZoom.module.css";

import LeftArrow from "../../../assets/LeftArrow.svg";
import RightArrow from "../../../assets/RightArrow.svg";

export default function ImageZoom({ open, images, currentIndex, onClose, onChangeImage }) {
  useEffect(() => {
    if (!open) return;

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }

      if (event.key === "ArrowLeft") {
        onChangeImage(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
      }

      if (event.key === "ArrowRight") {
        onChangeImage(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [open, currentIndex, images, onClose, onChangeImage]);

  if (!open) return null;

  const previousImage = () => {
    onChangeImage(currentIndex === 0 ? images.length - 1 : currentIndex - 1);
  };

  const nextImage = () => {
    onChangeImage(currentIndex === images.length - 1 ? 0 : currentIndex + 1);
  };

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div className={styles.modal} onClick={(event) => event.stopPropagation()}>
        <button className={styles.closeButton} onClick={onClose}>
          ✕
        </button>

        <button className={`${styles.arrowButton} ${styles.leftArrow}`} onClick={previousImage}>
          <img src={LeftArrow} alt="Previous" />
        </button>

        <img src={images[currentIndex]} alt="Listing" className={styles.largeImage} />

        <button className={`${styles.arrowButton} ${styles.rightArrow}`} onClick={nextImage}>
          <img src={RightArrow} alt="Next" />
        </button>

        <div className={styles.thumbnailRow}>
          {images.map((image, index) => (
            <img key={index} src={image} alt={`Thumbnail ${index + 1}`} className={`${styles.thumbnail} ${index === currentIndex ? styles.activeThumbnail : ""}`} onClick={() => onChangeImage(index)} />
          ))}
        </div>
      </div>
    </div>
  );
}
