import { createServerClientInstance } from "@/utils/supabase/server";

export async function getProducts(gender) {
  const supabase = await createServerClientInstance();

  const { data, error } = await supabase
    .from("sneakers")
    .select("id, title, description, price, discount, details, images")
    .eq("category", gender);

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded.");
  }

  return data;
}

export async function getProduct(id) {
  const supabase = await createServerClientInstance();

  const { data: product, error: productError } = await supabase
    .from("sneakers")
    .select("*")
    .eq("id", id)
    .single();

  if (productError || !product) {
    console.error("Product fetch failed:", productError);
    return null;
  }

  const { data: sneakerSizes, error: sizesError } = await supabase
    .from("sneakers_sizes")
    .select("size, quantity")
    .eq("sneaker_id", id);

  if (sizesError) {
    console.error("Sizes fetch failed:", sizesError);
    return null;
  }

  return { product, sneakerSizes };
}

export async function getUserOrders(email) {
  const supabase = await createServerClientInstance();

  const { data, error } = await supabase.auth.getUser();

  if (!data?.user?.email || error) throw new Error("User not logged in");

  const userEmail = data.user.email;

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("*")
    .eq("customer_email", userEmail);

  if (ordersError) {
    throw new Error("User orders could not be loaded");
  }

  return orders;
}

export async function getOrderDetails(orderId) {
  const supabase = await createServerClientInstance();

  let { data: orderItems, error: orderItemsError } = await supabase
    .from("order_items")
    .select("*")
    .eq("order_id", orderId);

  if (orderItemsError) {
    console.error(orderItemsError);
    throw new Error("Order items could not be loaded");
  }

  let { data: orderDetails, error: detailsError } = await supabase
    .from("orders")
    .select("*")
    .eq("id", orderId);

  if (detailsError) {
    console.error(detailsError);
    throw new Error("Order details could not be loaded");
  }

  return { orderItems, orderDetails };
}
