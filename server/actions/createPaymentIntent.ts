"use server";

import { actionClient } from "@/app/_lib/safe-action";
import { Product, ProductSize } from "@/types/product.types";

import Stripe from "stripe";

interface CartItem extends Product {
  quantity: number;
  selectedSize: ProductSize;
}

interface CreatePaymentIntentInput {
  amount: number;
  currency: string;
  cart: CartItem;
}

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const createPaymentIntent = actionClient
  .schema(null)
  .action(
    async ({ parsedInput }: { parsedInput: CreatePaymentIntentInput }) => {
      const { amount, cart, currency } = parsedInput;

      const paymentIntent = await stripe.paymentIntents.create({
        amount,
        currency,
        automatic_payment_methods: {
          enabled: true,
        },
        metadata: {
          cart: JSON.stringify(cart),
        },
      });
      console.log("PaymentIntent Created:", paymentIntent);

      return {
        success: {
          paymentIntentID: paymentIntent.id,
          clientSecretID: paymentIntent.client_secret,
        },
      };
    },
  );
