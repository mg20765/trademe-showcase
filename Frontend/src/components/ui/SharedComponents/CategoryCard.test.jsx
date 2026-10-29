import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CategoryCard from "./CategoryCard.jsx";

const item = {
  _id: "c1",
  title: "Oak chair",
  price_nzd: 1234.5,
  location: "Auckland",
  imageUrl: "https://example.com/chair.jpg",
};

describe("CategoryCard: what it shows", () => {
  it("shows the title, the price with two decimals, and the location", () => {
    render(<CategoryCard item={item} />);
    expect(screen.getByRole("heading", { name: "Oak chair" })).toBeInTheDocument();
    expect(screen.getByText("$1,234.50")).toBeInTheDocument();
    expect(screen.getByText(/Auckland/)).toBeInTheDocument();
  });

  it("says New Zealand when the item has no location", () => {
    render(<CategoryCard item={{ ...item, location: undefined }} />);
    expect(screen.getByText(/New Zealand/)).toBeInTheDocument();
  });

  it("shows $0.00 when the item has no price", () => {
    render(<CategoryCard item={{ ...item, price_nzd: undefined }} />);
    expect(screen.getByText("$0.00")).toBeInTheDocument();
  });

  it("shows the picture, described by the title, when there is one", () => {
    render(<CategoryCard item={item} />);
    expect(screen.getByRole("img", { name: "Oak chair" })).toHaveAttribute(
      "src",
      "https://example.com/chair.jpg",
    );
  });

  it("shows a placeholder when there is no picture", () => {
    render(<CategoryCard item={{ ...item, imageUrl: undefined }} />);
    expect(screen.getByRole("img", { name: "Product placeholder" })).toBeInTheDocument();
  });

  it("shows nothing at all when there is no item", () => {
    const { container } = render(<CategoryCard item={undefined} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("doesn't crash if the item disappears after it was showing", () => {
    const { rerender, container } = render(<CategoryCard item={item} />);
    expect(() => rerender(<CategoryCard item={undefined} />)).not.toThrow();
    expect(container).toBeEmptyDOMElement();
  });
});

describe("CategoryCard: the watchlist button", () => {
  it("offers to add the item when it isn't watchlisted", () => {
    const { container } = render(<CategoryCard item={item} isWatchlisted={false} />);
    expect(screen.getByRole("button", { name: "Add to watchlist" })).toBeInTheDocument();
    expect(container.querySelector(".product-card")).not.toHaveClass("watchlisted");
  });

  it("offers to remove the item when it is watchlisted", () => {
    const { container } = render(<CategoryCard item={item} isWatchlisted />);
    expect(screen.getByRole("button", { name: "Remove from watchlist" })).toBeInTheDocument();
    expect(screen.queryByRole("button", { name: "Add to watchlist" })).not.toBeInTheDocument();
    expect(container.querySelector(".product-card")).toHaveClass("watchlisted");
  });

  it("tells the page which item was clicked, whichever way it is toggled", async () => {
    const user = userEvent.setup();
    const onToggleWatchlist = vi.fn();
    const { rerender } = render(
      <CategoryCard item={item} isWatchlisted={false} onToggleWatchlist={onToggleWatchlist} />,
    );
    await user.click(screen.getByRole("button", { name: "Add to watchlist" }));
    rerender(<CategoryCard item={item} isWatchlisted onToggleWatchlist={onToggleWatchlist} />);
    await user.click(screen.getByRole("button", { name: "Remove from watchlist" }));
    expect(onToggleWatchlist).toHaveBeenCalledTimes(2);
    expect(onToggleWatchlist).toHaveBeenNthCalledWith(1, item);
    expect(onToggleWatchlist).toHaveBeenNthCalledWith(2, item);
  });

  it("doesn't also click the card behind it", async () => {
    const user = userEvent.setup();
    const onCardClick = vi.fn();
    render(
      <div onClick={onCardClick}>
        <CategoryCard item={item} onToggleWatchlist={() => {}} />
      </div>,
    );
    await user.click(screen.getByRole("button", { name: "Add to watchlist" }));
    expect(onCardClick).not.toHaveBeenCalled();
  });

  it("does nothing, and doesn't crash, if the page gave no handler", async () => {
    const user = userEvent.setup();
    render(<CategoryCard item={item} />);
    await user.click(screen.getByRole("button", { name: "Add to watchlist" }));
    await user.click(screen.getByRole("button", { name: "Compare this item" }));
    expect(screen.getByRole("heading", { name: "Oak chair" })).toBeInTheDocument();
  });
});

describe("CategoryCard: the compare button", () => {
  it("tells the page which item was clicked, without clicking the card behind it", async () => {
    const user = userEvent.setup();
    const onToggleCompare = vi.fn();
    const onCardClick = vi.fn();
    render(
      <div onClick={onCardClick}>
        <CategoryCard item={item} onToggleCompare={onToggleCompare} />
      </div>,
    );
    await user.click(screen.getByRole("button", { name: "Compare this item" }));
    expect(onToggleCompare).toHaveBeenCalledWith(item);
    expect(onCardClick).not.toHaveBeenCalled();
  });
});
