"use client";

import { Elements } from "@stripe/react-stripe-js";
import PaymentForm from "./PaymentForm";
import getStripe from "@/app/_lib/get-stripe";
import { useCart } from "@/app/_context/CartContext";
import { useState } from "react";

const stripe = getStripe();

export default function Payment() {
  const { cart } = useCart();

  const [fixedTotalPrice] = useState(() => {
    return Math.round(
      cart.reduce((acc, item) => {
        const discount = item.discount || 0;
        const finalPricePerUnit = item.price * (1 - discount / 100);

        return acc + finalPricePerUnit * item.quantity;
      }, 0) * 100,
    );
  });

  return (
    <div className="w-96 h-full flex items-center justify-center">
      <Elements
        stripe={stripe}
        options={{
          mode: "payment",
          currency: "eur",
          amount: fixedTotalPrice,
          appearance: {
            theme: "stripe",
            variables: { colorPrimary: "#6363FF", colorPrimaryText: "#F5F5F5" },
          },
        }}
      >
        <PaymentForm totalPrice={fixedTotalPrice} />
      </Elements>
    </div>
  );
}
