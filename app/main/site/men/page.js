import ProductListingPage from "@/app/_components/_products/ProductsListingPage";

export default function Men({ searchParams }) {
  return <ProductListingPage gender="men" searchParams={searchParams} />;
}
