import { useEffect, useRef, useState } from "react";
import ListingCard from "./ListingCard";
import ProductModal from "./ProductModal";
import "./listingSection.css";

// This is the backend route that gets listings from MongoDB Atlas.
const API_URL = "http://localhost:5001/api/home/listings";

// ListingSection fetches products and displays them in a carousel.
function ListingSection({ title, viewAllText }) {
    const [listings, setListings] = useState([]);
    const [watchlist, setWatchlist] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const carouselRef = useRef(null);

  // Load saved watchlist from browser storage.
    useEffect(() => {
    const savedWatchlist = JSON.parse(localStorage.getItem("homeWatchlist")) || [];
    setWatchlist(savedWatchlist);
    }, []);

  // Fetch listing data from backend API.
    useEffect(() => {
    async function fetchListings() {
        try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setListings(data);
        } catch (error) {
        console.error("Failed to fetch listings:", error);
        }
    }

    fetchListings();
    }, []);

  // Add or remove product from watchlist.
    function toggleWatchlist(productId) {
    let updatedWatchlist;

    if (watchlist.includes(productId)) {
        updatedWatchlist = watchlist.filter((id) => id !== productId);
    } else {
        updatedWatchlist = [...watchlist, productId];
    }

    setWatchlist(updatedWatchlist);
    localStorage.setItem("homeWatchlist", JSON.stringify(updatedWatchlist));
    }

  // Move carousel left or right.
    function scrollCards(direction) {
    if (!carouselRef.current) return;

    carouselRef.current.scrollBy({
        left: direction === "left" ? -320 : 320,
        behavior: "smooth",
    });
    }

    return (
    <section className="listing-section">
        <div className="listing-section__top">
        <h2>{title}</h2>
        <button>{viewAllText}</button>
        </div>

        <button
        className="listing-section__arrow listing-section__arrow--left"
        onClick={() => scrollCards("left")}
        >
        ‹
        </button>

        <div className="listing-section__cards" ref={carouselRef}>
        {listings.map((listing) => (
            <ListingCard
            key={listing._id}
            listing={listing}
            isWatched={watchlist.includes(listing._id)}
            onToggleWatchlist={toggleWatchlist}
            onOpenDetails={setSelectedProduct}
            />
        ))}
        </div>

        <button
        className="listing-section__arrow listing-section__arrow--right"
        onClick={() => scrollCards("right")}
            >
        ›
        </button>

        {selectedProduct && (
        <ProductModal
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
        />
        )}
    </section>
    );
}

export default ListingSection;