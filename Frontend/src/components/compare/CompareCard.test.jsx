import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import CompareCard from "./CompareCard.jsx";

const product = { title: "Oak desk", price_nzd: 120, condition: "Used", specs: "180cm" };

const priceLine = () => screen.getByText("Price:").closest("p");

describe("CompareCard: the price line", () => {
  it("shows the price in dollars, with no stray dash after it", () => {
    render(<CompareCard product={product} onRemove={() => {}} />);
    expect(priceLine()).toHaveTextContent("Price: $120");
    expect(priceLine()).not.toHaveTextContent("—");
  });

  it("formats a plain numeric price as New Zealand dollars instead of crashing", () => {
    render(<CompareCard product={{ title: "Desk", price: 50 }} onRemove={() => {}} />);
    expect(priceLine()).toHaveTextContent("Price: $50.00");
  });

  it("shows a single dash when there is no price at all", () => {
    render(<CompareCard product={{ title: "Desk" }} onRemove={() => {}} />);
    expect(priceLine()).toHaveTextContent(/^Price: —$/);
  });
});

describe("CompareCard: the rest of the card", () => {
  it("shows the title, condition and specs", () => {
    render(<CompareCard product={product} onRemove={() => {}} />);
    expect(screen.getByText("Oak desk")).toBeInTheDocument();
    expect(screen.getByText("Used")).toBeInTheDocument();
    expect(screen.getByText("180cm")).toBeInTheDocument();
  });

  it("says No title when the product has none", () => {
    render(<CompareCard product={{ price_nzd: 5 }} onRemove={() => {}} />);
    expect(screen.getByText("No title")).toBeInTheDocument();
  });

  it("shows the first picture when there is one, and a placeholder when not", () => {
    const { rerender, container } = render(
      <CompareCard product={{ ...product, images: ["a.jpg", "b.jpg"] }} onRemove={() => {}} />,
    );
    expect(screen.getByRole("img", { name: "Oak desk" })).toHaveAttribute("src", "a.jpg");
    rerender(<CompareCard product={product} onRemove={() => {}} />);
    expect(screen.queryByRole("img")).not.toBeInTheDocument();
    expect(container.querySelector("img")).toBeNull();
  });

  it("calls onRemove when the cross is pressed", async () => {
    const user = userEvent.setup();
    const onRemove = vi.fn();
    render(<CompareCard product={product} onRemove={onRemove} />);
    await user.click(screen.getByRole("button", { name: "✕" }));
    expect(onRemove).toHaveBeenCalledTimes(1);
  });
});
