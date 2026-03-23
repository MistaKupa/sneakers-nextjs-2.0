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

export async function getProductReviewStatsClient(id: ProductId) {
  const supabase = createClientInstance();

  const { data, error } = await supabase
    .from("reviews")
    .select("stars")
    .eq("sneaker_id", id);

  if (error) {
    console.error(error);
    throw new Error("Could not load reviews stats");
  }

  const total = data.length;

  const average =
    total > 0 ? data.reduce((acc, rating) => acc + rating.stars, 0) / total : 0;
  const roundAverage = Math.round(average * 10) / 10; // move decimal (4.3333 * 10) = 43.333 -> round to 43 -> 43 / 10 -> 4.3

  const starDistribution = [5, 4, 3, 2, 1].map((star) => ({
    star,
    count: data.filter((rating) => star === rating.stars).length,
    percentage:
      total > 0
        ? Math.round(
            (data.filter((rating) => star === rating.stars).length / total) *
              100,
          )
        : 0,
  }));

  return { total, average: roundAverage, starDistribution };
}
