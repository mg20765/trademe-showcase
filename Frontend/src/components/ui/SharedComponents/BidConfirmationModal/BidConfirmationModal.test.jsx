import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import BidConfirmationModal from "./BidConfirmationModal.jsx";

function setup(props = {}) {
  const onCancel = vi.fn();
  const onConfirm = vi.fn();
  render(
    <BidConfirmationModal bidAmount={1234.5} onCancel={onCancel} onConfirm={onConfirm} {...props} />,
  );
  return { onCancel, onConfirm, user: userEvent.setup() };
}

describe("BidConfirmationModal", () => {
  it("asks the buyer to confirm, and shows the bid in New Zealand dollars", () => {
    setup();
    expect(screen.getByRole("heading", { name: "Confirm Your Bid" })).toBeInTheDocument();
    expect(screen.getByText("$1,234.50")).toBeInTheDocument();
  });

  it("won't place the bid until the terms are accepted", () => {
    setup();
    expect(screen.getByRole("button", { name: "Place Bid" })).toBeDisabled();
  });

  it("places the bid once the terms are accepted", async () => {
    const { user, onConfirm } = setup();
    await user.click(screen.getByRole("checkbox"));
    const place = screen.getByRole("button", { name: "Place Bid" });
    expect(place).toBeEnabled();
    await user.click(place);
    expect(onConfirm).toHaveBeenCalledTimes(1);
  });

  it("goes back to disabled if the terms are un-ticked", async () => {
    const { user } = setup();
    await user.click(screen.getByRole("checkbox"));
    await user.click(screen.getByRole("checkbox"));
    expect(screen.getByRole("button", { name: "Place Bid" })).toBeDisabled();
  });

  it("does not place the bid when the button is pressed before accepting", async () => {
    const { user, onConfirm } = setup();
    await user.click(screen.getByRole("button", { name: "Place Bid" }));
    expect(onConfirm).not.toHaveBeenCalled();
  });

  it("cancels from the Cancel button and from the cross", async () => {
    const { user, onCancel } = setup();
    await user.click(screen.getByRole("button", { name: "Cancel" }));
    await user.click(screen.getByRole("button", { name: "✕" }));
    expect(onCancel).toHaveBeenCalledTimes(2);
  });
});
