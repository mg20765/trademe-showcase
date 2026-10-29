import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import WatchlistButton from "./WatchlistButton.jsx";
import WatchlistCheckIcon from "./WatchlistcheckIcon.jsx";
import CompareButtonSml from "./CompareButton-sml.jsx";

const YELLOW = "#FFC041";

describe("WatchlistButton", () => {
  it("has a name that says what it does", () => {
    render(<WatchlistButton onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "Add to watchlist" })).toBeInTheDocument();
  });

  it("calls onClick when it is pressed", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<WatchlistButton onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "Add to watchlist" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("works with the keyboard", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<WatchlistButton onClick={onClick} />);
    await user.tab();
    await user.keyboard("{Enter}");
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("has the yellow corner by default", () => {
    render(<WatchlistButton onClick={() => {}} />);
    expect(document.querySelector(`path[fill="${YELLOW}"]`)).not.toBeNull();
  });

  it("drops the yellow corner and the button's own box when showBackground is false", () => {
    render(<WatchlistButton onClick={() => {}} showBackground={false} />);
    const button = screen.getByRole("button", { name: "Add to watchlist" });
    expect(document.querySelector(`path[fill="${YELLOW}"]`)).toBeNull();
    expect(button.style.borderStyle).toBe("none");
    expect(button.style.padding).toBe("0px");
  });

  it("keeps its normal box when showBackground is left on", () => {
    render(<WatchlistButton onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "Add to watchlist" })).not.toHaveAttribute("style");
  });
});

describe("WatchlistCheckIcon", () => {
  it("has a name that says what it does", () => {
    render(<WatchlistCheckIcon onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "Remove from watchlist" })).toBeInTheDocument();
  });

  it("calls onClick when it is pressed", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<WatchlistCheckIcon onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "Remove from watchlist" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });
});

describe("CompareButtonSml", () => {
  it("has a name that says what it does", () => {
    render(<CompareButtonSml onClick={() => {}} />);
    expect(screen.getByRole("button", { name: "Compare this item" })).toBeInTheDocument();
  });

  it("calls onClick when it is pressed", async () => {
    const user = userEvent.setup();
    const onClick = vi.fn();
    render(<CompareButtonSml onClick={onClick} />);
    await user.click(screen.getByRole("button", { name: "Compare this item" }));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it("drops its own box when showBackground is false", () => {
    render(<CompareButtonSml onClick={() => {}} showBackground={false} />);
    const button = screen.getByRole("button", { name: "Compare this item" });
    expect(button.style.borderStyle).toBe("none");
    expect(button.style.padding).toBe("0px");
  });
});
