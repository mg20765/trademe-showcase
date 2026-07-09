import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import CategoryPage from "./pages/CategoryPage";
import ListingPage from "./pages/ListingPage/ListingPage";
import ComparePage from "./pages/ComparePage";
import PlaceBidPage from "./pages/PlaceBidPage";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/category" element={<CategoryPage />} />
        <Route path="/compare" element={<ComparePage />} />
        <Route path="/place-bid/:id" element={<PlaceBidPage />} />
        <Route path="/listing/:id" element={<ListingPage />} />
      </Routes>
    </BrowserRouter>
  );
}
