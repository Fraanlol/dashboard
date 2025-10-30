import { render, screen } from "@testing-library/react";
import type { RenderResult } from "@testing-library/react";
import App from "../../src/App";
import "@testing-library/jest-dom";
import { BrowserRouter } from "react-router-dom";

test('renders header and hero components', () => {
  render(
    <BrowserRouter>
      <App />
    </BrowserRouter>
  );

  expect(screen.getByText("React Vite Template")).toBeInTheDocument();
});
