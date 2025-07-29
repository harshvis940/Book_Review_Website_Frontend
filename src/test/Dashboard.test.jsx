// src/test/Dashboard.test.jsx
import { renderWithProviders } from "../static/Utils";
import { screen, waitFor } from "@testing-library/react";
import Dashboard from "../Pages/Dashboard";

test("Dashboard renders all major components", async () => {
  renderWithProviders(<Dashboard />);

  await waitFor(() => {
    expect(screen.getByRole("navigation")).toBeInTheDocument();
  });

  expect(screen.getByText(/admin/i)).toBeInTheDocument();
  expect(screen.getByText(/best/i)).toBeInTheDocument();
  expect(screen.getByText(/new/i)).toBeInTheDocument();
});
