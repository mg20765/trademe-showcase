// This file handles:
// - Showing the floating compare icon
// - Opening/closing the comparison sidebar
// - Managing comparison items
// - Removing items from the list

import { useState } from "react";
import ComparePopupIcon from "./ComparePopUpIcon";
import DoubleArrow from "../../../../assets/DoubleArrow.svg";
import styles from "./ComparePopUp.module.css";

import mockCompareItems from "./mockCompareItems";

export default function ComparePopUp() {
  // Temporary: always show the icon while developing.
  // Later this can become compareItems.length > 0
  const showIcon = true;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Temporary mock data until backend is connected
  const [compareItems, setCompareItems] = useState(mockCompareItems);

  const removeItem = (id) => {
    setCompareItems((items) => items.filter((item) => item.id !== id));
  };

  if (!showIcon) return null;

  return (
    <div className={styles.container}>
      {!sidebarOpen && (
        <div className={styles.iconContainer}>
          <ComparePopupIcon count={compareItems.length} onClick={() => setSidebarOpen(true)} />
        </div>
      )}

      {sidebarOpen && <div className={styles.overlay} onClick={() => setSidebarOpen(false)} />}

      <div className={`${styles.sidebar} ${sidebarOpen ? styles.sidebarOpen : ""}`}>
        <div className={styles.header}>
          <h2>Comparison List ({compareItems.length})</h2>
        </div>

        <div className={styles.list}>
          {compareItems.map((item) => (
            <div key={item.id} className={styles.listItem}>
              <span>
                {item.title}, {item.seller}
              </span>

              <button className={styles.removeButton} onClick={() => removeItem(item.id)}>
                ✕
              </button>
            </div>
          ))}
        </div>
        <div className={styles.sidebarFooter}>
          <button className={styles.collapseButton} onClick={() => setSidebarOpen(false)}>
            <img src={DoubleArrow} alt="Collapse sidebar" className={styles.arrowIcon} />
          </button>
        </div>
      </div>
    </div>
  );
}
