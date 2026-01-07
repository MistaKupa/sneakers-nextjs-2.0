import ProductListingPage from "@/app/_components/_products/ProductsListingPage";
import { getProducts } from "@/app/_lib/data-service";

export default async function Women({ searchParams }) {
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
