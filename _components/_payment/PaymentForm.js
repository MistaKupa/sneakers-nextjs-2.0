"use client";

import { useCart } from "@/app/_context/CartContext";

import {
  AddressElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import { useState } from "react";

export default function PaymentForm({ totalPrice }) {
  const stripe = useStripe();
  const elements = useElements();
  const { cart, setCart, checkoutProgress, setCheckoutProgress, totalItems } =
    useCart();

  const [email, setEmail] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (!stripe || !elements) {
      setIsLoading(false);

      return;
    }

    const { error: submitError } = await elements.submit();
    if (submitError) {
      setErrorMessage(submitError.message);
      setIsLoading(false);

      return;
    }

    const adressElement = elements.getElement(AddressElement);
    const adressData = await adressElement.getValue();

    const response = await fetch("/api/paymentIntent", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: totalPrice,
        currency: "eur",
        cart: cart.map((item) => ({
          productID: item.id,
          title: item.title,
          size: item.selectedSize,
          quantity: item.quantity,
          price: item.price,
        })),
      }),
    });

    const data = await response.json();

    // const { data } = await createPaymentIntent({
    //   amount: totalPrice,
    //   currency: "eur",
    //   cart: cart.map((item) => ({
    //     quantity: item.quantity,
    //     productID: item.id,
    //     title: item.title,
    //     price: item.price,
    //     image: item.images[0],
    //   })),
    // });

    if (data?.error) {
      setErrorMessage(data.error);
      setIsLoading(false);

      return;
    }
    if (data?.success) {
      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        clientSecret: data.clientSecretID,
        redirect: "if_required",
        confirmParams: {
          return_url: "http://localhost:3000/success",
        },
      });
      if (error) {
        setErrorMessage(error.message);
        setIsLoading(false);
        console.error(error);
        return;
      } else {
        setIsLoading(false);
      }
      if (paymentIntent.status === "succeeded") {
        const response = await fetch("/api/saveOrder", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            order: {
              adress: {
                email,
                name: adressData.value.name,
                country: adressData.value.address.country,
                city: adressData.value.address.city,
                street: adressData.value.address.line1,
                postal: adressData.value.address.postal_code,
                phone: adressData.value.phone,
              },
              total_price: totalPrice / 100,
              paid: true,
              products_total_quantity: totalItems,
              products: cart.map((product) => ({
                productId: product.id,
                productName: product.title,
                productImage: product.images[0] || [],
                productSize: product.selectedSize,
                quantity: product.quantity,
                price: product.price,
              })),
            },
          }),
        });

        const data = await response.json();

        if (data?.success) {
          setIsLoading(false);
          setCheckoutProgress("order-confirmed");

          setCart([]);
        }
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col justify-center w-full h-full gap-5"
    >
      <PaymentElement />
      <AddressElement
        options={{
          mode: "shipping",
          fields: { phone: "always" },
          validation: { phone: { required: "always" } },
        }}
      />
      <label htmlFor="email" className="flex flex-col text-gray-600">
        Email
        <input
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Your email..."
          id="email"
          autoComplete="email"
          className="border focus:border-newPrimary outline-none px-3 h-11 rounded-md shadow-sm"
        />
      </label>
      <button
        type="submit"
        disabled={!stripe || !elements}
        className="font-bold text-newWhite bg-newPrimary w-full h-12 rounded-md"
      >
        <span>{isLoading ? "Processing..." : "Pay Now"}</span>
      </button>
    </form>
  );
}
