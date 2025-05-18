"use client";

import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import getStripe from "@/app/_lib/get-stripe";
import { useCart } from "@/app/_context/CartContext";

const stripe = getStripe();

export default function Payment() {
  const { cart } = useCart();

  const totalPrice =
    cart.reduce((acc, item) => {
      return acc + item.price * item.quantity;
    }, 10) * 100;

  return (
    <div className="w-96 h-full flex items-center justify-center">
      <Elements
        stripe={stripe}
        options={{
          mode: "payment",
          currency: "eur",
          amount: totalPrice,
          appearance: {
            theme: "bubblegum",
            variables: { colorPrimary: "#6363FF", colorPrimaryText: "#F5F5F5" },
          },
        }}
      >
        <PaymentForm totalPrice={totalPrice} />
      </Elements>
    </div>
  );
}
