import ProductButtons from "@/_components/_productDetails/ProductButtons";
import { Product } from "@/types/product.types";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

const mockAddToCart = vi.fn();

vi.mock("@/app/_context/CartContext", () => ({
  useCart: () => ({ addToCart: mockAddToCart }),
}));

describe("ProductButtons", () => {
  const mockProduct = {
    id: 1,
    title: "Test",
    price: 100,
    discount: 0,
  } as Product;

  it("should increment quantity", async () => {
    const user = userEvent.setup();
    render(<ProductButtons product={mockProduct} selectedSize="43" />);

    await user.click(screen.getByRole("button", { name: "+" }));
    expect(screen.getByText("2")).toBeInTheDocument();
  });

  it("should decrement quantity", async () => {
    const user = userEvent.setup();
    render(<ProductButtons product={mockProduct} selectedSize="43" />);

    await user.click(screen.getByRole("button", { name: "+" }));
    expect(screen.getByText("2")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "-" }));
    expect(screen.getByText("1")).toBeInTheDocument();
  });

  it("should not decrement below 1", async () => {
    const user = userEvent.setup();
    render(<ProductButtons product={mockProduct} selectedSize="43" />);

    await user.click(screen.getByRole("button", { name: "-" }));
    expect(screen.getByText(1)).toBeInTheDocument();
  });

  it("shoul disable add to cart when no size selected", async () => {
    const user = userEvent.setup();
    render(<ProductButtons product={mockProduct} selectedSize={null} />);

    expect(screen.getByRole("button", { name: /add to cart/i })).toBeDisabled();
  });

  it("should call addToCart with correct args", async () => {
    const user = userEvent.setup();
    render(<ProductButtons product={mockProduct} selectedSize="43" />);

    await user.click(screen.getByRole("button", { name: "+" }));
    await user.click(screen.getByRole("button", { name: /add to cart/i }));

    expect(mockAddToCart).toHaveBeenCalledWith(mockProduct, 2, "43");
  });
});
