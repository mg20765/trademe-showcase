import { createContext, useContext, useState } from "react";

const CompareContext = createContext();

export function CompareProvider({ children }) {
  const [compareItems, setCompareItems] = useState([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const addToCompare = (newItem) => {
    setCompareItems((prevItems) => {
      if (prevItems.some((item) => item.item_num === newItem.item_num)) {
        return prevItems;
      }
      if (prevItems.length >= 8) {
        alert("You can compare up to 8 items max.");
        return prevItems;
      }
      return [...prevItems, newItem];
    });
    setSidebarOpen(true);
  };

  const removeItem = (itemNum) => {
    setCompareItems((items) => items.filter((item) => item.item_num !== itemNum));
  };

  return (
    <CompareContext.Provider
      value={{
        compareItems,
        sidebarOpen,
        setSidebarOpen,
        addToCompare,
        removeItem,
      }}
    >
      {children}
    </CompareContext.Provider>
  );
}

export const useCompare = () => useContext(CompareContext);
