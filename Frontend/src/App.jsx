import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ComparePage from "./pages/ComparePage";
import PlaceBidPage from "./pages/PlaceBidPage";
import ListingPage from "./pages/ListingPage/ListingPage"; // <-- Import the real ListingPage
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
