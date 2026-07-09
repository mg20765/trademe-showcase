export default function PlaceBidButton({ onClick, style, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      style={{
        backgroundColor: "#DB9C13",
        color: "white",
        border: "none",
        borderRadius: "6px",
        padding: "8px 16px",
        fontWeight: "bold",
        cursor: "pointer",
        ...style,
      }}
    >
      Place Bid
    </button>
  );
}
