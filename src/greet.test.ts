import { greet } from "./greet";

test("greet returns a string, greeting the passed name", () => {
  expect(greet("World")).toBe("Hello, World!");
  expect(greet("Katrina")).toBe("Hello, Katrina!");
});
