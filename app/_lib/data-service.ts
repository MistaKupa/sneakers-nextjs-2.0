import { CollectionId } from "@/types/collection.types";
import { ProductId } from "@/types/product.types";
import { createServerClientInstance } from "@/utils/supabase/server";

export async function getProductsByTag(tag: string, limit: number) {
  const supabase = await createServerClientInstance();

  let query = supabase.from("sneakers").select("*").contains("tags", [tag]);

  if (limit) query = query.limit(limit);

  const { data, error } = await query;

  if (error) {
    console.log(error);
    throw new Error("Products could not be loaded by tag.");
  }

  return data;
}

export async function getProducts(gender: string) {
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

export async function getProduct(id: ProductId) {
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

export async function getCollections() {
  const supabase = await createServerClientInstance();

  const { data, error } = await supabase
    .from("collections")
    .select("id, name, image_url")
    .order("id", { ascending: true });

  if (error) {
    console.log(error);
    throw new Error("Couldnt fetch collections.");
  }

  return data;
}

export async function getCollectionDetailsByID(collectionID: CollectionId) {
  const supabase = await createServerClientInstance();

  const { data, error } = await supabase
    .from("collections")
    .select("*")
    .eq("id", collectionID)
    .single();

  console.log(data, "not fetchin any data ");

  if (error) {
    throw new Error("Couldnt find collection details.");
  }

  return data;
}

export async function getProductsByCollectionID(collectionID: CollectionId) {
  const supabase = await createServerClientInstance();

  const { data: collectionData, error: collectionError } = await supabase
    .from("sneakers_collections")
    .select("*")
    .eq("collection_id", collectionID);

  if (collectionError) {
    console.log(collectionError);
    throw new Error("Couldnt fetch collection products.");
  }

  if (!collectionData || collectionData.length === 0) return [];

  let sneakerIDs = collectionData.map((item) => item.sneaker_id);

  const { data: products, error: productsError } = await supabase
    .from("sneakers")
    .select("*")
    .in("id", sneakerIDs);

  if (productsError) {
    console.log(productsError);
    throw new Error("Could not fetch sneakers.");
  }

  return products;
}

export async function getUserOrders() {
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
