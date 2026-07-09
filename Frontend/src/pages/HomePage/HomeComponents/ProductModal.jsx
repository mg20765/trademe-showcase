import "./productModal.css";

// ProductModal opens when user clicks a listing card
function ProductModal({ product, onClose }) {

     // Use whichever price field is available from the backend
    const price = product.price_nzd || product.price || product.start_price || 0;

    return (
    <div className="product-modal__overlay" onClick={onClose}>

        {/* Main popup window. Prevents closing when clicking inside the modal */}
        <div className="product-modal" onClick={(event) => event.stopPropagation()}>

            {/* Close button for the popup. */}
        <button className="product-modal__close" onClick={onClose}>
            ×
        </button>

        {/* Product image section. */}
        <div className="product-modal__image">
            {product.image ? (
            <img src={product.image} alt={product.title} />
            ) : (
            <div>Image coming soon</div>
            )}
        </div>
        
        {/* Product information displayed inside the popup */}
        <div className="product-modal__details">
            <p className="product-modal__location">
            {product.location || "Auckland"}
            </p>

            <h2>{product.title}</h2>

            <p className="product-modal__condition">
            Condition: {product.condition || "Not provided"}
            </p>

            <p className="product-modal__description">
            {product.description || "No description available yet."}
            </p>

            <div className="product-modal__price">
            <span>Current bid</span>
            <strong>${Number(price).toFixed(2)}</strong>
            </div>

            <button className="product-modal__bid">Place bid</button>
        </div>
        </div>
    </div>
    );
}

export default ProductModal;