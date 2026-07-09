<<<<<<< HEAD
import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ListingPage from "./pages/ListingPage/ListingPage"; // <-- Bringing this back
import ComparePage from "./pages/ComparePage";
=======
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ComparePage from "./pages/ComparePage";
import PlaceBidPage from "./pages/PlaceBidPage";
import ListingPage from "./pages/ListingPage/ListingPage";
>>>>>>> 80f0f0001a4d766d5a6e62afeb2797cad763a847

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/category" element={<CategoryPage />} />
      <Route path="/compare" element={<ComparePage />} />
      <Route path="/listing/:id" element={<ListingPage />} />{" "}
      {/* <-- Using real ListingPage */}
    </Routes>
  );
}
