import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { renderHook, act, waitFor } from "@testing-library/react";
import useWatchlist from "./usewatchList";

const API = "http://localhost:5001/api/watchlist";

const chair = { _id: "c1", title: "Oak chair", price_nzd: 120, location: "Auckland" };
const desk = { _id: "d1", title: "Desk", price_nzd: 200, location: "Wellington" };
const saved = (item, category = "Chairs") => ({
  itemId: item._id,
  title: item.title,
  price_nzd: item.price_nzd,
  location: item.location,
  category,
});

// A pretend server. `overrides` lets a test make one kind of request fail.
function fakeServer({ list = [], failPost = false, failDelete = false } = {}) {
  const calls = [];
  const fetchMock = vi.fn(async (url, options = {}) => {
    const method = options.method ?? "GET";
    calls.push({ url, method, body: options.body ? JSON.parse(options.body) : undefined });
    if (method === "GET") return { ok: true, status: 200, json: async () => list };
    if (method === "POST") {
      return failPost
        ? { ok: false, status: 500, json: async () => ({ message: "Server error" }) }
        : { ok: true, status: 201, json: async () => ({}) };
    }
    return failDelete
      ? { ok: false, status: 500, json: async () => ({ message: "Server error" }) }
      : { ok: true, status: 200, json: async () => ({}) };
  });
  vi.stubGlobal("fetch", fetchMock);
  return { calls, fetchMock };
}

async function loadHook(serverOptions) {
  const server = fakeServer(serverOptions);
  const hook = renderHook(() => useWatchlist());
  await waitFor(() => expect(server.fetchMock).toHaveBeenCalled());
  return { ...hook, ...server };
}

beforeEach(() => {
  vi.spyOn(console, "error").mockImplementation(() => {});
});

afterEach(() => {
  vi.unstubAllGlobals();
  vi.restoreAllMocks();
});

describe("useWatchlist: loading", () => {
  it("loads the saved watchlist when it first appears", async () => {
    const { result } = await loadHook({ list: [saved(chair), saved(desk, "Desks")] });
    await waitFor(() => expect(result.current.watchlistItems).toHaveLength(2));
    expect(result.current.watchlistIds.has("c1")).toBe(true);
    expect(result.current.watchlistIds.has("d1")).toBe(true);
  });

  it("starts empty, and doesn't crash, if the list can't be loaded", async () => {
    vi.stubGlobal("fetch", vi.fn(() => Promise.reject(new Error("offline"))));
    const { result } = renderHook(() => useWatchlist());
    await waitFor(() => expect(console.error).toHaveBeenCalled());
    expect(result.current.watchlistItems).toEqual([]);
    expect(result.current.watchlistIds.size).toBe(0);
  });

  it("ignores a server error when loading, and stays empty", async () => {
    vi.stubGlobal(
      "fetch",
      vi.fn(async () => ({ ok: false, status: 500, json: async () => ({ message: "boom" }) })),
    );
    const { result } = renderHook(() => useWatchlist());
    await waitFor(() => expect(console.error).toHaveBeenCalled());
    expect(result.current.watchlistItems).toEqual([]);
  });
});

describe("useWatchlist: adding and removing", () => {
  it("adds an item, sending the right details to the server", async () => {
    const { result, calls } = await loadHook();
    await act(() => result.current.toggleWatchlist(chair, "Chairs"));

    const post = calls.find((c) => c.method === "POST");
    expect(post.url).toBe(API);
    expect(post.body).toEqual(saved(chair, "Chairs"));
    expect(result.current.watchlistIds.has("c1")).toBe(true);
    expect(result.current.watchlistItems).toEqual([saved(chair, "Chairs")]);
  });

  it("removes an item that is already on the list when it is toggled again", async () => {
    const { result, calls } = await loadHook({ list: [saved(chair)] });
    await waitFor(() => expect(result.current.watchlistIds.has("c1")).toBe(true));
    await act(() => result.current.toggleWatchlist(chair, "Chairs"));

    expect(calls.find((c) => c.method === "DELETE").url).toBe(`${API}/c1`);
    expect(result.current.watchlistIds.has("c1")).toBe(false);
    expect(result.current.watchlistItems).toEqual([]);
  });

  it("toggling twice puts the list back how it was", async () => {
    const { result } = await loadHook();
    await act(() => result.current.toggleWatchlist(chair, "Chairs"));
    await waitFor(() => expect(result.current.watchlistIds.has("c1")).toBe(true));
    await act(() => result.current.toggleWatchlist(chair, "Chairs"));
    expect(result.current.watchlistItems).toEqual([]);
  });

  it("removeFromWatchlist takes off only that item", async () => {
    const { result, calls } = await loadHook({ list: [saved(chair), saved(desk, "Desks")] });
    await waitFor(() => expect(result.current.watchlistItems).toHaveLength(2));
    await act(() => result.current.removeFromWatchlist("c1"));

    expect(calls.find((c) => c.method === "DELETE").url).toBe(`${API}/c1`);
    expect(result.current.watchlistItems.map((i) => i.itemId)).toEqual(["d1"]);
    expect(result.current.watchlistIds.has("d1")).toBe(true);
    expect(result.current.watchlistIds.has("c1")).toBe(false);
  });
});

describe("useWatchlist: when the server says no", () => {
  it("does not show an item as saved if the server failed to save it", async () => {
    const { result } = await loadHook({ failPost: true });
    await act(() => result.current.toggleWatchlist(chair, "Chairs"));

    expect(result.current.watchlistIds.has("c1")).toBe(false);
    expect(result.current.watchlistItems).toEqual([]);
  });

  it("keeps an item on the list if the server failed to delete it (toggle)", async () => {
    const { result } = await loadHook({ list: [saved(chair)], failDelete: true });
    await waitFor(() => expect(result.current.watchlistIds.has("c1")).toBe(true));
    await act(() => result.current.toggleWatchlist(chair, "Chairs"));

    expect(result.current.watchlistIds.has("c1")).toBe(true);
    expect(result.current.watchlistItems).toHaveLength(1);
  });

  it("keeps an item on the list if the server failed to delete it (remove button)", async () => {
    const { result } = await loadHook({ list: [saved(chair)], failDelete: true });
    await waitFor(() => expect(result.current.watchlistIds.has("c1")).toBe(true));
    await act(() => result.current.removeFromWatchlist("c1"));

    expect(result.current.watchlistIds.has("c1")).toBe(true);
    expect(result.current.watchlistItems).toHaveLength(1);
  });

  it("leaves the list alone if the network drops while saving", async () => {
    const { result, fetchMock } = await loadHook();
    fetchMock.mockImplementation((url, options = {}) =>
      options.method === "POST"
        ? Promise.reject(new Error("network down"))
        : Promise.resolve({ ok: true, json: async () => [] }),
    );
    await act(() => result.current.toggleWatchlist(chair, "Chairs"));

    expect(result.current.watchlistItems).toEqual([]);
    expect(console.error).toHaveBeenCalled();
  });
});
