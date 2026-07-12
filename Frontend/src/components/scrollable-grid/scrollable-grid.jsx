import { useRef } from "react";
import "./scrollable-grid.css";

export default function ScrollableGrid({ children, emptyMessage }) {
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    console.log(`Scrolling ${direction}`);
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  const isEmpty = Array.isArray(children) ? children.length === 0 : !children;

  return (
    <div className="scrollable-grid-wrapper">
      <button
        className="scroll-arrow scroll-arrow-left"
        onClick={() => scroll("left")}
        aria-label="Scroll left"
      >
        ‹
      </button>

      <div className="scrollable-grid" ref={scrollRef}>
        {isEmpty ? (
          <p className="no-items">{emptyMessage || "No items found."}</p>
        ) : (
          children
        )}
      </div>

      <button
        className="scroll-arrow scroll-arrow-right"
        onClick={() => scroll("right")}
        aria-label="Scroll right"
      >
        ›
      </button>
    </div>
  );
}
