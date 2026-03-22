import { ProductId } from "@/types/product.types";
import { createClientInstance } from "@/utils/supabase/client";

export async function getProductReviewsClient(id: ProductId, page: number) {
  const pageSize = 3;
  const from = (page - 1) * pageSize;
  const to = from + pageSize - 1;

  const supabase = createClientInstance();

  const { data, error } = await supabase
    .from("reviews")
    .select("*")
    .eq("sneaker_id", id)
    .order("created_at", { ascending: false })
    .range(from, to);

  if (error) {
    console.error(error.message);
    throw new Error("Reviews could not be loaded");
  }

  return {
    reviews: data,
    nextPage: data.length === pageSize ? page + 1 : undefined,
  };
}
