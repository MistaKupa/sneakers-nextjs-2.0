"use client";

import { useRouter } from "next/navigation";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import ProductCard from "./ProductCard";

export default function Products({
  products,
  totalPages,
  paginatedProducts,
  currentPage,
  sortBy,
}) {
  const router = useRouter();

  const handlePageChange = (page) => {
    const params = new URLSearchParams(window.location.search);
    params.set("page", page);
    router.push(`?${params.toString()}`);
  };

  const handleSortChange = (e) => {
    const params = new URLSearchParams(window.location.search);
    params.set("sortBy", e.target.value);
    params.set("page", "1"); // reset to first page on sort change
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="flex flex-col gap-6">
      {/* Sort dropdown */}
      <div className="flex flex-col gap-2 lg:flex-row lg:place-self-end lg:items-center">
        <label htmlFor="sort" className="font-semibold">
          Sort by:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={handleSortChange}
          className="border rounded-md p-2 w-full sm:w-48"
        >
          <option value="Name A-Z">Name A-Z</option>
          <option value="Name Z-A">Name Z-A</option>
          <option value="Price A-Z">Price Lowest</option>
          <option value="Price Z-A">Price Highest</option>
        </select>
      </div>

      {/* Product grid */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-center my-10">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="p-2 border rounded disabled:opacity-50 hover:bg-gray-100 transition"
        >
          <IoChevronBack />
        </button>

        {Array.from({ length: totalPages }, (_, index) => {
          const page = index + 1;
          return (
            <button
              key={page}
              onClick={() => handlePageChange(page)}
              className={`w-8 h-8 rounded border text-sm font-medium ${
                currentPage === page
                  ? "bg-newPrimary text-white"
                  : "bg-white hover:bg-gray-100"
              }`}
            >
              {page}
            </button>
          );
        })}

        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="p-2 border rounded disabled:opacity-50 hover:bg-gray-100 transition"
        >
          <IoChevronForward />
        </button>
      </div>
    </div>
  );
}
