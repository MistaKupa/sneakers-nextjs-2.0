function ProductPrice({ price, discount }) {
  const discountedPrice = price * (discount / 100);

  return (
    <>
      {discount ? (
        <div className="flex flex-col justify-between gap-3">
          <div className="flex items-end gap-5">
            <span className="font-bold text-3xl text-newPrimary">
              € {discountedPrice.toFixed(2)}
            </span>
            {discount && (
              <span className="bg-dark-500 text-dark-100 font-bold px-2.5 py-0.5 rounded-lg">
                {discount}%
              </span>
            )}
          </div>

          <span className="font-bold text-dark-400 line-through decoration-dark-400">
            € {price.toFixed(2)}
          </span>
        </div>
      ) : (
        <div className="flex flex-col justify-between gap-3">
          <div className="flex items-end gap-5">
            <span className="font-bold text-3xl text-dark-500">
              € {price.toFixed(2)}
            </span>
          </div>
        </div>
      )}
    </>
  );
}

export default ProductPrice;
