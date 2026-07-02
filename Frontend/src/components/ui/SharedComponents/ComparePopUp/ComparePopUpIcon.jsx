// This file handles:
// Displaying the icon, the number badge, the glowing animation, and calling onClick

import CompareIcon from "../assets/CompareIcon.svg";
import styles from "./ComparePopUp.module.css";

export default function ComparePopupIcon({ count, onClick }) {
  return (
    <button className={styles.compareButton} onClick={onClick}>
      <img src={CompareIcon} alt="Compare" className={styles.icon} />

      {count > 0 && <span className={styles.badge}>{count}</span>}
    </button>
  );
}
