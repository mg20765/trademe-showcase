import { Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ListingPage from "./pages/ListingPage/ListingPage"; // <-- Bringing this back
import ComparePage from "./pages/ComparePage";

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
