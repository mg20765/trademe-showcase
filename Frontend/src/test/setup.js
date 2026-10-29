import "@testing-library/jest-dom/vitest";
import { afterEach } from "vitest";
import { cleanup } from "@testing-library/react";

// Tidy the pretend page between tests so one test can't affect the next.
afterEach(() => {
  cleanup();
});
