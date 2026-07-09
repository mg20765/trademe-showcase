import "./listingCard.css";

// ListingCard shows one product card.
// Clicking the card opens full product details in a popup.
function ListingCard({ listing, isWatched, onToggleWatchlist, onOpenDetails }) {
    const price = listing.price_nzd || listing.price || listing.start_price || 0;

    return (
        // Main product card. Clicking anywhere opens the product details.
    <article className="listing-card" onClick={() => onOpenDetails(listing)}>
        <div className="listing-card__image-area">
        {listing.image ? (
            <img src={listing.image} alt={listing.title} />
        ) : (
            <div className="listing-card__placeholder">Image coming soon</div>
        )}

        <button
            className={`listing-card__watch ${isWatched ? "active" : ""}`}
            onClick={(event) => {
            event.stopPropagation();
            onToggleWatchlist(listing._id);
            }}
        >
            ♡
        </button>
        </div>

         {/* Product information shown below the image. */}
        <div className="listing-card__body">
        <div className="listing-card__meta">
            <span>{listing.location || "Auckland"}</span>
            <span>Closes: Fri, 17 Jul</span>
        </div>

        <h3>{listing.title}</h3>

        <p className="listing-card__condition">
            {listing.condition || "Good condition"}
        </p>

        <p className="listing-card__shipping">▱ Shipping from $1.00</p>
        
        {/* Auction status and price. */}
        <div className="listing-card__price">
            <span>Reserve met</span>
            <strong>${Number(price).toFixed(2)}</strong>
        </div>
        </div>
    </article>
    );
}

export default ListingCard;