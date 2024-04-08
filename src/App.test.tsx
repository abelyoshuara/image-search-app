/**
 * test scenario for App component
 *
 * - App component:
 *   - should renders correctly
 *   - should request api success on search input
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

  it("should request api success on search input", async () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    );

    const inputSearch = screen.getByPlaceholderText(
      "Type something to search…",
    );
    expect(inputSearch).toBeInTheDocument();
    await userEvent.type(inputSearch, "birds");

    const photos = await screen.findAllByTestId("img");
    expect(photos).toHaveLength(2);
  });
});
