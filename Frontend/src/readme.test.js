// @vitest-environment node
import { readFileSync } from "node:fs";
import { describe, it, expect } from "vitest";

// The README is what visitors read first, so it must say plainly that this is
// a student project and that it has nothing to do with the real Trade Me.
const readme = readFileSync(new URL("../../README.md", import.meta.url), "utf8");
const top = readme.split("\n").slice(0, 12).join("\n");

describe("README disclaimer", () => {
  it("says near the top that this is a student project", () => {
    expect(top).toMatch(/student project/i);
    expect(top).toMatch(/Mission Ready/);
  });

  it("says it is not affiliated with or endorsed by Trade Me", () => {
    expect(top).toMatch(/not affiliated with/i);
    expect(top).toMatch(/endorsed by/i);
    expect(top).toMatch(/Trade Me/);
  });

  it("says the listings and photos are sample content for demonstration", () => {
    expect(top).toMatch(/sample content/i);
    expect(top).toMatch(/product photos/i);
  });

  it("tells an owner how to ask for their content to be removed", () => {
    expect(top).toMatch(/removed/i);
    expect(top).toMatch(/open an issue/i);
  });
});

describe("README testing instructions", () => {
  it("explains how to run the tests", () => {
    expect(readme).toMatch(/Running the tests/);
    expect(readme).toMatch(/npm test/);
    expect(readme).toMatch(/Frontend/);
  });
});
