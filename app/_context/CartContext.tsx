"use client";

import { Product, ProductId, ProductSize } from "@/types/product.types";
import {
  createContext,
  Dispatch,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

interface CartItem extends Product {
  quantity: number;
  selectedSize: ProductSize;
}

interface CartContextType {
  cart: CartItem[];
  setCart: Dispatch<SetStateAction<CartItem[]>>;
  isCartReady: boolean;
  addToCart: (
    product: Product,
    quantity: number,
    selectedSize: ProductSize,
  ) => void;
  removeFromCart: (productId: ProductId, selectedSize: ProductSize) => void;
  updateQuantity: (
    productId: ProductId,
    newQuantity: number,
    selectedSize: ProductSize,
  ) => void;
  totalItems: number;
  checkoutProgress: string;
  setCheckoutProgress: Dispatch<SetStateAction<string>>;
  totalCartPrice: number;
  cartColor: number;
  setCartColor: (color: number) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [checkoutProgress, setCheckoutProgress] = useState("");
  const [isCartReady, setIsCartReady] = useState(false);
  const [cartColor, setCartColor] = useState(0);

  // Load cart from localStorage on first load
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      try {
        setCart(JSON.parse(storedCart));
      } catch (err) {
        console.error("Failed to parse cart from localStorage:", err);
        localStorage.removeItem("cart");
      }
    }
    setIsCartReady(true);
    setCheckoutProgress("in-cart");
  }, []);

  // Save cart to localStorage every time it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const totalCartPrice = cart.reduce((acc, item) => {
    return acc + item.price * item.quantity;
  }, 0);

  const totalItems = cart.reduce((total, item) => total + item.quantity, 0);

  function addToCart(
    product: Product,
    quantity: number,
    selectedSize: ProductSize,
  ) {
    setCart((prevCart) => {
      const isInCart = prevCart.find(
        (item) => item.id === product.id && item.selectedSize === selectedSize,
      );

      if (isInCart) {
        return prevCart.map((item) =>
          item.id === product.id && item.selectedSize === selectedSize
            ? { ...item, quantity: item.quantity + quantity }
            : item,
        );
      }

      return [...prevCart, { ...product, quantity, selectedSize }];
    });
  }

  function removeFromCart(productId: ProductId, selectedSize: ProductSize) {
    setCart((prevCart) => {
      if (!productId && !selectedSize) return;

      return prevCart.filter(
        (item) =>
          !(item.id === productId && item.selectedSize === selectedSize),
      );
    });
  }

  function updateQuantity(
    productId: ProductId,
    newQuantity: number,
    selectedSize: ProductSize,
  ) {
    if (newQuantity === 0) {
      alert("Are you sure you want to remove product?");
      removeFromCart(productId, selectedSize);
    }

    if (newQuantity > 0 && newQuantity <= 10) {
      setCart((prevCart) =>
        prevCart.map((item) =>
          item.id === productId && item.selectedSize === selectedSize
            ? { ...item, quantity: newQuantity }
            : item,
        ),
      );
    }
  }

  return (
    <CartContext.Provider
      value={{
        cart,
        setCart,
        isCartReady,
        addToCart,
        removeFromCart,
        updateQuantity,
        totalItems,
        checkoutProgress,
        setCheckoutProgress,
        totalCartPrice,
        cartColor,
        setCartColor,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
}

export { CartProvider, useCart };
