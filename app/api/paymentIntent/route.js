import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET);

export async function POST(request) {
  try {
    const res = await request.json();

    const { amount, cart, currency } = res;

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

    return NextResponse.json({
      success: true,
      paymentIntentID: paymentIntent.id,
      clientSecretID: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
