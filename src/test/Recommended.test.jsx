// src/test/Recommended.test.jsx
import { describe, it, expect, vi, beforeEach } from "vitest";
import { screen, render, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Recommended from "../assets/components/Dashboard/Recommended";

vi.mock("swiper/react", () => ({
  Swiper: ({ children }) => <div data-testid="swiper">{children}</div>,
  SwiperSlide: ({ children }) => <div data-testid="slide">{children}</div>,
}));
vi.mock("swiper/modules", () => ({
  Navigation: {},
  Pagination: {},
  Autoplay: {},
}));

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => vi.fn(),
  };
});

vi.mock("../../../static/DefaultExports", async () => {
  const actual = await vi.importActual("../../../static/DefaultExports");
  return {
    ...actual,
    getStarDisplay: (rating) => <div data-testid="stars">{rating ?? 4.5}</div>,
  };
});

describe("Recommended Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
    localStorage.setItem("token", "dummy-token"); // Set dummy token if needed
  });

  it("renders Swiper with dummy book data", async () => {
    render(
      <MemoryRouter>
        <Recommended />
      </MemoryRouter>
    );

    await waitFor(() => {
      expect(screen.getByText("Rich Dad Poor Dad")).toBeInTheDocument();
      expect(screen.getByText("The Psychology of Money")).toBeInTheDocument();
      expect(
        screen.getByText("The Power of Your Subconscious Mind")
      ).toBeInTheDocument();
    });

    expect(screen.getAllByTestId("slide").length).toBeGreaterThan(1);
    expect(screen.getAllByRole("button", { name: /buy now/i })).toHaveLength(3);
  });

  it("shows fallback image when image URL fails", async () => {
    render(
      <MemoryRouter>
        <Recommended />
      </MemoryRouter>
    );

    const image = await screen.findByAltText("Rich Dad Poor Dad");
    expect(image).toBeInTheDocument();
    image.onerror?.({ target: image });
    expect(image.src).toContain("https://m.media-amazon.com");
  });

  it("displays author and genre info", async () => {
    render(
      <MemoryRouter>
        <Recommended />
      </MemoryRouter>
    );

    expect(await screen.findByText(/robert kiyosaki/i)).toBeInTheDocument();
    expect(screen.getByText(/Finance, Self-Help/i)).toBeInTheDocument();
  });
});
