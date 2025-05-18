function PriceDetails({ price, discountedPrice, discount }) {
  return (
    <div className="min-h-[80px] flex flex-col">
      {discount ? (
        <>
          <span className="text-newPrimary text-sm font-semibold">
            € {discountedPrice.toFixed(2)}
          </span>

          <div className="flex items-center gap-3">
            <span className="text-dark-300 text-sm font-semibold line-through">
              € {price.toFixed(2)}
            </span>
            <span className="text-dark-100 text-xs font-semibold bg-dark-500 rounded-full px-2 py-1">
              -{discount}%
            </span>
          </div>
        </>
      ) : (
        <>
          <span className="text-dark-500 text-sm font-semibold">
            € {price.toFixed(2)}
          </span>
        </>
      )}
    </div>
  );
}

export default PriceDetails;
