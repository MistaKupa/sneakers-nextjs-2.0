import { CartProvider, useCart } from "@/app/_context/CartContext";
import { Product } from "@/types/product.types";
import { render, renderHook, screen } from "@testing-library/react";
import { act, ReactNode } from "react";

const mockProduct = {
  id: 1,
  title: "Mock Sneaker",
  price: 100,
  discount: 0,
} as Product;

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe("useCart", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("should start with empty cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.cart).toHaveLength(0);
  });

  it("should add item to cart", async () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      result.current.addToCart(mockProduct, 1, "43");
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(1);
    expect(result.current.cart[0].selectedSize).toBe("43");
  });

  it("should update quantity if same item and size added", async () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      result.current.addToCart(mockProduct, 1, "43");
      result.current.addToCart(mockProduct, 2, "43");
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(3);
  });

  it("should add another item if same item but different size", async () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      result.current.addToCart(mockProduct, 1, "43");
      result.current.addToCart(mockProduct, 1, "44");
    });

    expect(result.current.cart).toHaveLength(2);
  });

  it("should remove item from cart", async () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      result.current.addToCart(mockProduct, 1, "43");
    });

    await act(async () => {
      result.current.removeFromCart(mockProduct.id, "43");
    });

    expect(result.current.cart).toHaveLength(0);
  });

  it("should update quantity", async () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      result.current.addToCart(mockProduct, 1, "43");
    });

    // updateQuantity(product, newQuantity, selectedSize)
    // sets quantity to provided newQuantity
    // if quantity is 1 and newQuantity 3 it will set quantity to 3 (not 1 + 3 / 1 - 3) !!
    await act(async () => {
      result.current.updateQuantity(mockProduct.id, 3, "43");
    });

    expect(result.current.cart).toHaveLength(1);
    expect(result.current.cart[0].quantity).toBe(3);
  });

  it("should calculate total price", async () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    // MOCKPRODUCT PRICE = 100
    await act(async () => {
      result.current.addToCart(mockProduct, 2, "43");
    });

    expect(result.current.totalCartPrice).toBe(200);
  });

  it("should calculate total items", async () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    await act(async () => {
      result.current.addToCart(mockProduct, 2, "43");
      result.current.addToCart(mockProduct, 3, "44");
    });

    expect(result.current.totalItems).toBe(5);
  });
});
