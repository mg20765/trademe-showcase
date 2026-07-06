import "./App.css";
import { Routes, Route } from "react-router-dom";

import ListingPage from "./pages/ListingPage/ListingPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<ListingPage />} />
      <Route path="/listing/:id" element={<ListingPage />} />
    </Routes>
  );
}

export default App;
