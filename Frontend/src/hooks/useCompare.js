import { useState, useEffect } from "react";
import {
  getComparisonList,
  addToComparison,
  removeFromComparison,
  clearComparison,
} from "../services/compareService";

export default function useCompare() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Load comparison list on mount

  const fetchComparison = async (silent = false) => {
    try {
      if (!silent) setLoading(true);
      const data = await getComparisonList();
      setProducts(data.productIds || []);
    } catch (_err) {
      setError("Failed to load comparison list");
    } finally {
      if (!silent) setLoading(false);
    }
  };

  useEffect(() => {
    const loadComparison = async () => {
      await fetchComparison();
    };
    loadComparison();
  }, []);

  const handleAdd = async (productId) => {
    try {
      await addToComparison(productId);
      await fetchComparison(true);
    } catch (_err) {
      setError("Failed to add product");
    }
  };

  const handleRemove = async (productId) => {
    try {
      await removeFromComparison(productId);
      await fetchComparison(true);
    } catch (_err) {
      setError("Failed to remove product");
    }
  };

  const handleClear = async () => {
    try {
      await clearComparison();
      setProducts([]);
    } catch (_err) {
      setError("Failed to clear comparison list");
    }
  };

  return { products, loading, error, handleAdd, handleRemove, handleClear };
}
