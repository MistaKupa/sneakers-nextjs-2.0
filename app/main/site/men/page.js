import ProductListingPage from "@/_components/_products/ProductsListingPage";
import { getProducts } from "@/app/_lib/data-service";

export default async function Men({ searchParams }) {
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
