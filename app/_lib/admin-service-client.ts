import { OrderId, OrderUpdate } from "@/types/order.types";
import {
  ProductId,
  ProductInsert,
  ProductInsertFormValues,
  ProductUpdate,
} from "@/types/product.types";
import { UserId, UserUpdate } from "@/types/user.types";
import { createClientInstance } from "@/utils/supabase/client";

export async function getOrdersClient() {
  const supabase = createClientInstance();

  let { data: orders, error: orderError } = await supabase
    .from("orders")
    .select("id, order_date, total_price, customer_email,status")
    .order("order_date", { ascending: false });

  if (orderError) {
    console.error(orderError.message);
    throw new Error("Orders could not be loaded");
  }

  return orders ?? [];
}

export async function updateOrder({
  id,
  changes,
}: {
  id: OrderId;
  changes: OrderUpdate;
}) {
  const supabase = createClientInstance();

  const { data, error } = await supabase
    .from("orders")
    .update(changes)
    .eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Order status could not be updated!");
  }
}

export async function deleteClientOrder(id: OrderId) {
  const supabase = createClientInstance();

  console.log(id);

  const { error } = await supabase.from("orders").delete().eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Order could not be deleted");
  }
}

export async function getOrderDetailsClient(orderId: OrderId) {
  const supabase = createClientInstance();

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

///////////////////  USER DATA //////////////////

export async function getUsersClient() {
  const supabase = createClientInstance();

  let { data: profiles, error } = await supabase.from("profiles").select("*");

  if (error) {
    console.error(error.message);
    throw new Error("Users could not be loaded");
  }

  return profiles;
}

export async function getUserDetailsClient(userId: UserId) {
  const supabase = createClientInstance();

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

export async function updateUserClient({
  id,
  changes,
}: {
  id: UserId;
  changes: UserUpdate;
}) {
  const supabase = createClientInstance();

  const { data, error } = await supabase
    .from("profiles")
    .update(changes)
    .eq("user_id", id);

  if (error) {
    console.error(error.message);
    throw new Error("User data could not be updated!");
  }
}

/////////////////// PRODUCTS //////////////////

export async function getAllProductsClient() {
  const supabase = createClientInstance();

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

export async function getProductDetailsClient(id: ProductId) {
  const supabase = createClientInstance();

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

export async function updateProduct({
  id,
  changes,
}: {
  id: ProductId;
  changes: ProductUpdate;
}) {
  const supabase = createClientInstance();

  const { data: productData, error } = await supabase
    .from("sneakers")
    .update(changes)
    .eq("id", id);

  if (error) {
    console.error(error.message);
    throw new Error("Product could not be updated!");
  }
}

export async function createNewProductClient({
  newProductForm,
  imageFiles,
}: {
  newProductForm: Omit<ProductInsert, "images">;
  imageFiles: File[];
}) {
  const supabase = createClientInstance();
  const folderName = newProductForm.title.replace(/\s+/g, "_");

  // 1. Uploadnem Image

  const uploadPromises = imageFiles.map(async (image) => {
    const fileName = `${folderName}/${crypto.randomUUID()}`;

    const { data, error: storageUploadError } = await supabase.storage
      .from("images")
      .upload(fileName, image);

    if (storageUploadError) {
      console.error(storageUploadError.message);
      throw new Error("Image could not be uploaded into storage");
    }

    return supabase.storage.from("images").getPublicUrl(data.path).data
      .publicUrl;
  });

  const imageUrls = await Promise.all(uploadPromises);

  // 2. Vytvorim produkt v DB

  const { data: newProductData, error: newProductError } = await supabase
    .from("sneakers")
    .insert([{ ...newProductForm, images: imageUrls }])
    .select()
    .single();

  if (newProductError) {
    console.error(newProductError.message);
    throw new Error("New product could not be created");
  }

  return newProductData;
}

/////////////////// GET TOTAL PRODUCTS //////////////////

export async function getTotalProductsClient() {
  const supabase = createClientInstance();

  let { data, error } = await supabase
    .from("order_items")
    .select("quantity, price_at_time, product_category");

  if (error) {
    console.error(error.message);
    throw new Error("Products could not be loaded");
  }

  return data;
}
