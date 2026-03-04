import { createServerClientInstance } from "@/utils/supabase/server";
import { OrderId } from "@/types/order.types";
import { UserId } from "@/types/user.types";
import { ProductId } from "@/types/product.types";

export async function getOrdersServer() {
  const supabase = await createServerClientInstance();

  let { data: orders, error: orderError } = await supabase
    .from("orders")
    .select("id, order_date, total_price, customer_email,status");

  if (orderError) {
    console.error("Supabase Error:", orderError.message);
    throw new Error("Orders could not be loaded");
  }

  return orders ?? [];
}

export async function getOrderDetailsServer(orderId: OrderId) {
  const supabase = await createServerClientInstance();

  let { data: orderItems, error: orderItemsError } = await supabase
    .from("order_items")
    .select(
      "product_id, quantity, price_at_time, product_name,product_image, product_size",
    )
    .eq("order_id", orderId);

  if (orderItemsError) {
    console.error(orderItemsError.message);
    throw new Error("Order items could not be loaded");
  }

  let { data: orderDetails, error: orderDetailsError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId)
    .single();

  if (orderDetailsError) {
    console.error(orderDetailsError.message);
    throw new Error("Order details could not be loaded");
  }

  return { orderItems, orderDetails };
}

/////////////////// GET USERS DATA //////////////////

export async function getUsersServer() {
  const supabase = await createServerClientInstance();

  let { data: profiles, error } = await supabase.from("profiles").select("*");

  if (error) {
    console.error(error.message);
    throw new Error("Users could not be loaded");
  }

  return profiles;
}

export async function getUserDetailsServer(userId: UserId) {
  const supabase = await createServerClientInstance();

  let { data: userDetails, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("user_id", userId)
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("User details could not be loaded");
  }

  return userDetails;
}

/////////////////// GET PRODUCTS //////////////////

export async function getAllProductsServer() {
  const supabase = await createServerClientInstance();

  let { data: products, error } = await supabase
    .from("sneakers")
    .select("*")
    .order("id", { ascending: true });

  if (error) {
    console.error(error.message);
    throw new Error("Products could not be loaded");
  }

  return products;
}

export async function getProductDetailsServer(id: ProductId) {
  const supabase = await createServerClientInstance();

  let { data, error } = await supabase
    .from("sneakers")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error.message);
    throw new Error("Product details could not be loaded");
  }

  return data;
}

/////////////////// GET TOTAL PRODUCTS //////////////////

export async function getTotalProductsServer() {
  const supabase = await createServerClientInstance();

  let { data, error } = await supabase
    .from("order_items")
    .select("quantity, price_at_time, product_category");

  if (error) {
    console.error(error.message);
    throw new Error("Products could not be loaded");
  }

  return data;
}
