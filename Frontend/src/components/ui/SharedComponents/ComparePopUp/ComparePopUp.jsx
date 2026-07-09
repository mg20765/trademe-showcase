// This file handles:
// - Showing the floating compare icon
// - Opening/closing the comparison sidebar
// - Managing comparison items
// - Removing items from the list

import ComparePopupIcon from "./ComparePopupIcon";
import DoubleArrow from "../../../../assets/DoubleArrow.svg";
import styles from "./ComparePopUp.module.css";
import { useCompare } from "../../../Context/CompareContext.jsx";

export default function ComparePopUp() {
  // 🔄 Pull global tracking state directly out of your global context hook
  const { compareItems, sidebarOpen, setSidebarOpen, removeItem } = useCompare();

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
            <div key={item.item_num} className={styles.listItem}>
              <span>
                {item.title} {item.seller ? `by ${item.seller}` : ""}
              </span>

              <button className={styles.removeButton} onClick={() => removeItem(item.item_num)}>
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
