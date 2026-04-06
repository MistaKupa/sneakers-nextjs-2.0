import ProductListingPage from "@/_components/_products/ProductsListingPage";
import { getProductsByTag } from "@/app/_lib/data-service-server";
import { SearchParams } from "@/types/product.types";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";

export default async function KidStyles({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const products = await getProductsByTag("kid-styles");

  return (
    <ProductListingPage
      gender="Kids"
      products={products}
      searchParams={searchParams}
      pageSize={4}
    />
  );
}
