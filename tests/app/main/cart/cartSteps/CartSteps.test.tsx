import CartSteps from "@/app/main/cart/cartSteps/CartSteps";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockCartItem = {
  id: 1,
  title: "Test",
  price: 100,
  discount: 0,
  images: ["/test.jpg"],
  quantity: 1,
  selectedSize: "43",
};

const mockCartFunctions = {
  setCheckoutProgress: vi.fn(),
  updateQuantity: vi.fn(),
  removeFromCart: vi.fn(),
};

const mockUseCart = vi.fn();

vi.mock("@/app/_context/CartContext", () => ({
  useCart: () => mockUseCart(),
}));

describe("cartSteps", () => {
  it("should show loading when cart not ready", () => {
    mockUseCart.mockReturnValue({
      isCartReady: false,
      cart: [],
      checkoutProgress: "in-cart",
    });

    render(<CartSteps />);

    expect(screen.getByText(/loading cart.../i)).toBeInTheDocument();
  });

  it("should show empty cart when no items", () => {
    mockUseCart.mockReturnValue({
      isCartReady: true,
      cart: [],
      checkoutProgress: "in-cart",
    });

    render(<CartSteps />);

    expect(screen.getByText(/cart is empty/i)).toBeInTheDocument();
  });

  it("should show cart summary when item exist", () => {
    mockUseCart.mockReturnValue({
      isCartReady: true,
      cart: [mockCartItem],
      checkoutProgress: "in-cart",
      ...mockCartFunctions,
    });

    render(<CartSteps />);

    expect(
      screen.getByRole("button", { name: /proceed to checkout/i }),
    ).toBeInTheDocument();
  });

  it("should call setCheckoutProgress when checkout button clicked", async () => {
    mockUseCart.mockReturnValue({
      isCartReady: true,
      cart: [mockCartItem],
      checkoutProgress: "in-cart",
      ...mockCartFunctions,
    });

    const user = userEvent.setup();
    render(<CartSteps />);

    await user.click(
      screen.getByRole("button", { name: /proceed to checkout/i }),
    );

    expect(mockCartFunctions.setCheckoutProgress).toHaveBeenCalledWith(
      "in-checkout",
    );
  });

  it("should show checkout when progress is in-checkout", () => {
    mockUseCart.mockReturnValue({
      isCartReady: true,
      cart: [mockCartItem],
      checkoutProgress: "in-checkout",
      totalCartPrice: 100,
    });

    render(<CartSteps />);

    expect(screen.getByText(/total:/i)).toBeInTheDocument();
  });

  it("should show orderConfirmed when progress is order-confirmed", () => {
    mockUseCart.mockReturnValue({
      isCartReady: true,
      cart: [],
      checkoutProgress: "order-confirmed",
    });

    render(<CartSteps />);

    expect(
      screen.getByText(/thank you for your purchase/i),
    ).toBeInTheDocument();

    expect(
      screen.getByRole("button", { name: /your order/i }),
    ).toBeInTheDocument();
  });
});
