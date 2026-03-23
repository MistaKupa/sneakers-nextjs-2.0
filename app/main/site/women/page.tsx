import ProductListingPage from "@/_components/_products/ProductsListingPage";
import { getProducts } from "@/app/_lib/data-service-server";
import { SearchParams } from "@/types/product.types";

export default async function Women({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const products = await getProducts("women");

  return (
    <ProductListingPage
      gender="Women"
      products={products}
      searchParams={searchParams}
      pageSize={2}
    />
  );
}
