import { createClient } from "@/utils/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request) {
  const supabase = await createClient();

  try {
    const res = await request.json();

    const { order } = res;

    const { data: orderData, error: orderError } = await supabase
      .from("orders")
      .insert([
        {
          customer_email: order.adress.email,
          customer_name: order.adress.name,
          customer_country: order.adress.country,
          customer_city: order.adress.city,
          customer_adress: order.adress.street,
          customer_postal: order.adress.postal,
          customer_phone_number: order.adress.phone,
          products_total_quantity: order.products_total_quantity,
          total_price: order.total_price,
          paid: order.paid,
        },
      ])
      .select("id")
      .single();

    if (orderError) {
      console.error("Order insert error:", orderError);
      return NextResponse.json(
        { error: "Failed to insert order" },
        { status: 500 }
      );
    }

    const orderId = orderData.id;

    const orderItems = order.products.map((item) => ({
      order_id: orderId,
      customer_name: order.adress.name,
      product_id: item.productId,
      product_name: item.productName,
      product_image: item.productImage,
      product_size: item.productSize,
      quantity: item.quantity,
      price_at_time: item.price,
    }));

    const { data: orderItemsData, error: orderItemsError } = await supabase
      .from("order_items")
      .insert(orderItems);

    if (orderItemsError) {
      console.error("Order items insert error:", orderItemsError);
      return NextResponse.json({ error: "Failed to insert order items" });
    }

    return NextResponse.json({
      success: true,
    });
  } catch (error) {
    console.error("Server error:", error);
    return NextResponse.json({ message: error.message }, { status: 500 });
  }
}
