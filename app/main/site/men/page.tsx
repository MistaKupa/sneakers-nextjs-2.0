import ProductListingPage from "@/_components/_products/ProductsListingPage";
import { getProducts } from "@/app/_lib/data-service";
import { SearchParams } from "@/types/product.types";

export default async function Men({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const products = await getProducts("men");

  return (
    <ProductListingPage
      gender="Men"
      products={products}
      searchParams={searchParams}
      pageSize={4}
    />
  );
}
