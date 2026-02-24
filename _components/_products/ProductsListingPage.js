import { getProducts } from "@/app/_lib/data-service";
import Products from "./Products";

export default async function ProductListingPage({
  gender,
  products,
  pageSize,
  searchParams,
}) {
  const PAGE_SIZE = pageSize;

  const sParams = await searchParams;
  const sortBy = sParams?.sortBy || "Name A-Z";
  const page = parseInt(sParams?.page) || 1;

  // const products = await getProducts(gender);

  const sortedProducts = [...products].sort((a, b) => {
    if (sortBy === "Name A-Z") return a.title.localeCompare(b.title);
    if (sortBy === "Name Z-A") return b.title.localeCompare(a.title);

    const getPrice = (product) =>
      product.discount
        ? (product.price * product.discount) / 100
        : product.price;

    if (sortBy === "Price A-Z") return getPrice(a) - getPrice(b);
    if (sortBy === "Price Z-A") return getPrice(b) - getPrice(a);

    return 0;
  });

  const totalPages = Math.ceil(sortedProducts.length / PAGE_SIZE);
  const paginatedProducts = sortedProducts.slice(
    (page - 1) * PAGE_SIZE,
    page * PAGE_SIZE,
  );

  return (
    <section className="max-w-[1440px] min-h-screen py-20 px-8 flex flex-col justify-center gap-10 md:px-10 lg:px-12 xl:px-0 xl:my-20 xl:py-0 mx-auto ">
      {/* Heading */}
      <div className="flex items-baseline gap-1 mt-16">
        <h2 className="text-dark-500 text-2xl font-semibold uppercase">
          {/* {gender === "men" ? "Men Sneakers" : "Women Sneakers"} */}
          {`${gender} Sneakers`}
        </h2>
        <span className="text-dark-400 text-sm font-medium">
          [{products.length}]
        </span>
      </div>

      {/* Product grid */}
      <Products
        products={paginatedProducts}
        totalPages={totalPages}
        currentPage={page}
        sortBy={sortBy}
      />
    </section>
  );
}
