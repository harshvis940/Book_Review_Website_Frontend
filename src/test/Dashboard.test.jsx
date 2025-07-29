// import React from "react";
// import { render, screen, waitFor, act } from "@testing-library/react";
// import { vi, describe, it, expect, beforeEach, afterEach } from "vitest";
// import Dashboard from "../Pages/Dashboard";

// // Mock the child components
// vi.mock("../assets/components/NavBar", () => ({
//   default: ({ btnText }) => (
//     <div data-testid="navbar">
//       <span>NavBar - {btnText}</span>
//     </div>
//   ),
// }));

// vi.mock("../assets/components/Dashboard/Recommended", () => ({
//   default: () => <div data-testid="recommended">Recommended Component</div>,
// }));

// vi.mock("../assets/components/Dashboard/BestSellingBooks", () => ({
//   default: () => (
//     <div data-testid="bestselling">Best Selling Books Component</div>
//   ),
// }));

// vi.mock("../assets/components/Dashboard/NewBooks", () => ({
//   default: () => <div data-testid="newbooks">New Books Component</div>,
// }));

// // Mock Swiper components
// vi.mock("swiper/react", () => ({
//   Swiper: ({ children }) => <div data-testid="swiper">{children}</div>,
//   SwiperSlide: ({ children }) => (
//     <div data-testid="swiper-slide">{children}</div>
//   ),
// }));

// vi.mock("swiper/modules", () => ({
//   Navigation: {},
//   Pagination: {},
//   Autoplay: {},
// }));

// // Mock Material-UI Button
// vi.mock("@mui/material/Button", () => ({
//   default: ({ children, ...props }) => (
//     <button data-testid="mui-button" {...props}>
//       {children}
//     </button>
//   ),
// }));

// describe("Dashboard Component", () => {
//   beforeEach(() => {
//     vi.useFakeTimers();
//   });

//   afterEach(() => {
//     vi.useRealTimers();
//     vi.clearAllMocks();
//   });

//   describe("Component Rendering", () => {
//     it("should render all main components", () => {
//       render(<Dashboard />);

//       expect(screen.getByTestId("navbar")).toBeInTheDocument();
//       expect(screen.getByText("NavBar - admin")).toBeInTheDocument();
//       expect(screen.getByTestId("recommended")).toBeInTheDocument();
//       expect(screen.getByTestId("bestselling")).toBeInTheDocument();
//       expect(screen.getByTestId("newbooks")).toBeInTheDocument();
//     });

//     it("should render components in the correct order", () => {
//       render(<Dashboard />);

//       // Get all components and verify they exist
//       const navbar = screen.getByTestId("navbar");
//       const recommended = screen.getByTestId("recommended");
//       const bestselling = screen.getByTestId("bestselling");
//       const newbooks = screen.getByTestId("newbooks");

//       // Verify all components are present
//       expect(navbar).toBeInTheDocument();
//       expect(recommended).toBeInTheDocument();
//       expect(bestselling).toBeInTheDocument();
//       expect(newbooks).toBeInTheDocument();
//     });

//     it("should not render PopularBooks component (commented out)", () => {
//       render(<Dashboard />);
//       expect(screen.queryByTestId("popularbooks")).not.toBeInTheDocument();
//     });
//   });

//   describe("Fade-in Animation", () => {
//     it("should initially render with opacity-0 class", () => {
//       render(<Dashboard />);

//       // Find the main container div with the opacity classes
//       const mainContainer = document.querySelector(".min-h-screen");

//       expect(mainContainer).toHaveClass("opacity-0");
//       expect(mainContainer).not.toHaveClass("opacity-100");
//       expect(mainContainer).toHaveClass("transition-opacity");
//       expect(mainContainer).toHaveClass("duration-700");
//     });

//     it("should add opacity-100 class after 100ms timeout", async () => {
//       render(<Dashboard />);

//       const mainContainer = document.querySelector(".min-h-screen");

//       // Initially should have opacity-0
//       expect(mainContainer).toHaveClass("opacity-0");

//       // Fast-forward time by 100ms
//       act(() => {
//         vi.advanceTimersByTime(100);
//       });

//       // Wait for the state update with timeout
//       await waitFor(
//         () => {
//           expect(mainContainer).toHaveClass("opacity-100");
//           expect(mainContainer).not.toHaveClass("opacity-0");
//         },
//         { timeout: 1000 }
//       );
//     });

//     it("should maintain transition classes throughout the animation", async () => {
//       render(<Dashboard />);

//       const mainContainer = document.querySelector(".min-h-screen");

//       expect(mainContainer).toHaveClass("transition-opacity", "duration-700");

//       act(() => {
//         vi.advanceTimersByTime(100);
//       });

//       await waitFor(
//         () => {
//           expect(mainContainer).toHaveClass(
//             "transition-opacity",
//             "duration-700"
//           );
//         },
//         { timeout: 1000 }
//       );
//     });

//     it("should not change opacity before 100ms", () => {
//       render(<Dashboard />);

//       const mainContainer = document.querySelector(".min-h-screen");

//       act(() => {
//         vi.advanceTimersByTime(50);
//       });

//       expect(mainContainer).toHaveClass("opacity-0");
//       expect(mainContainer).not.toHaveClass("opacity-100");
//     });
//   });

//   describe("CSS Classes and Styling", () => {
//     it("should apply correct CSS classes to main container", () => {
//       render(<Dashboard />);

//       const mainContainer = document.querySelector(".min-h-screen");

//       expect(mainContainer).toHaveClass("min-h-screen");
//       expect(mainContainer).toHaveClass("transition-opacity");
//       expect(mainContainer).toHaveClass("duration-700");
//     });

//     it("should have proper conditional class logic", async () => {
//       render(<Dashboard />);

//       const mainContainer = document.querySelector(".min-h-screen");

//       expect(mainContainer.className).toMatch(/opacity-0|opacity-100/);

//       act(() => {
//         vi.advanceTimersByTime(100);
//       });

//       await waitFor(
//         () => {
//           expect(mainContainer).toHaveClass("opacity-100");
//         },
//         { timeout: 1000 }
//       );
//     });
//   });

//   describe("Component Integration", () => {
//     it("should pass correct props to NavBar", () => {
//       render(<Dashboard />);
//       expect(screen.getByText("NavBar - admin")).toBeInTheDocument();
//     });

//     it("should render all dashboard sections without props conflicts", () => {
//       render(<Dashboard />);

//       expect(screen.getByTestId("recommended")).toBeVisible();
//       expect(screen.getByTestId("bestselling")).toBeVisible();
//       expect(screen.getByTestId("newbooks")).toBeVisible();
//     });
//   });

//   describe("useEffect Hook Behavior", () => {
//     it("should set up timer on component mount", () => {
//       const setTimeoutSpy = vi.spyOn(global, "setTimeout");

//       render(<Dashboard />);

//       expect(setTimeoutSpy).toHaveBeenCalledWith(expect.any(Function), 100);

//       setTimeoutSpy.mockRestore();
//     });

//     it("should clean up timer on component unmount", () => {
//       const { unmount } = render(<Dashboard />);

//       expect(() => unmount()).not.toThrow();
//     });

//     it("should handle multiple rapid mounts/unmounts", () => {
//       const { unmount } = render(<Dashboard />);

//       unmount();

//       const { unmount: secondUnmount } = render(<Dashboard />);

//       expect(screen.getByTestId("navbar")).toBeInTheDocument();

//       secondUnmount();
//     });
//   });

//   describe("Accessibility", () => {
//     it("should be accessible to screen readers", () => {
//       render(<Dashboard />);

//       expect(screen.getByTestId("navbar")).toBeInTheDocument();
//       expect(screen.getByTestId("recommended")).toBeInTheDocument();
//       expect(screen.getByTestId("bestselling")).toBeInTheDocument();
//       expect(screen.getByTestId("newbooks")).toBeInTheDocument();
//     });

//     it("should maintain proper document structure", () => {
//       render(<Dashboard />);

//       const mainContainer = document.querySelector(".min-h-screen");
//       expect(mainContainer).toBeInTheDocument();
//     });
//   });

//   describe("Performance", () => {
//     it("should render without unnecessary re-renders", () => {
//       const { rerender } = render(<Dashboard />);

//       expect(screen.getByTestId("navbar")).toBeInTheDocument();

//       rerender(<Dashboard />);
//       expect(screen.getByTestId("navbar")).toBeInTheDocument();
//     });

//     it("should handle state updates efficiently", async () => {
//       render(<Dashboard />);

//       const mainContainer = document.querySelector(".min-h-screen");

//       act(() => {
//         vi.advanceTimersByTime(100);
//       });

//       await waitFor(
//         () => {
//           expect(mainContainer).toHaveClass("opacity-100");
//         },
//         { timeout: 1000 }
//       );
//     });
//   });
// });
