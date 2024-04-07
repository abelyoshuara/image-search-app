/**
 * test scenario for App component
 *
 * - App component:
 *   - should renders correctly
 *   - should handle input-search typing correctly
 *   - should handle badges on click correctly
 */

import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { render, screen, userEvent } from "./utils/test-utils";

describe("App component", () => {
  it("should renders correctly", () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const title = screen.getByText(/Image Search APP/i);
    expect(title).toBeInTheDocument();

    const subtitle = screen.getByText(/Images retrieved from Unsplash api/i);
    expect(subtitle).toBeInTheDocument();

    const inputSearch = screen.getByPlaceholderText(
      "Type something to search…",
    );
    expect(inputSearch).toBeInTheDocument();

    const badges = screen.getAllByRole("badge");
    expect(badges).toHaveLength(4);
  });

  it("should handle input-search typing correctly", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );
    const inputSearch = screen.getByPlaceholderText(
      "Type something to search…",
    );
    await userEvent.type(inputSearch, "car");
    expect(inputSearch).toHaveValue("car");
  });

  it("should handle badges on click correctly", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const inputSearch = screen.getByPlaceholderText(
      "Type something to search…",
    );
    expect(inputSearch).toBeInTheDocument();

    const badges = screen.getAllByRole("badge");

    for (const badge of badges) {
      await userEvent.click(badge);
      expect(inputSearch).toHaveValue(badge.textContent!.toLowerCase());
    }
  });
});
