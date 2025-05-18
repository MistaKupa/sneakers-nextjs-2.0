"use server";

import { actionClient } from "@/app/_lib/safe-action";

import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET);

export const createPaymentIntent = actionClient
  .schema("")
  .action(async ({ amount, cart, currency }) => {
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
  });
