function ProductSizes({ sizes, selectedSize, setSelectedSize }) {
  return (
    <div className="flex gap-1">
      {sizes.map((size) => (
        <button
          key={size.size}
          onClick={() => setSelectedSize(size.size)}
          className={`w-12 flex items-center justify-center  rounded-md  ${
            selectedSize === size.size
              ? "border-2 border-newPrimary"
              : "border hover:border-newPrimary"
          }`}
        >
          {size.size}
        </button>
      ))}
    </div>
  );
}

export default ProductSizes;
