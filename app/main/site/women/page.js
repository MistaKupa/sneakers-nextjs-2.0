import ProductListingPage from "@/app/_components/_products/ProductsListingPage";

export default function Women({ searchParams }) {
  return (
    <ProductListingPage
      gender="women"
      searchParams={searchParams}
      pageSize={2}
    />
  );
}
