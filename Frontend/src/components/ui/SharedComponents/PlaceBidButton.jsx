export default function PlaceBidButton({ onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        backgroundColor: "DB9C13",
        color: "white",
        border: "none",
        borderRadius: "6px",
        padding: "8px 16px",
        fontWeight: "bold",
        cursor: "pointer",
      }}
    >
      Place Bid
    </button>
  );
}
