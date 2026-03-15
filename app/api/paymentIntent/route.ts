import { ProductId, ProductSize } from "@/types/product.types";
import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET!);

interface CartItem {
  productID: ProductId;
  title: string;
  size: ProductSize;
  quantity: number;
  price: number;
}

export async function POST(request: Request) {
  try {
    const res: { amount: number; cart: CartItem[]; currency: string } =
      await request.json();

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
