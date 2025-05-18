export default function CartHeader() {
  return (
    <div className="bg-dark-200 text-dark-300 text-xs xl:text-sm font-light grid grid-cols-7 gap-4 justify-between py-2 px-5 mb-5">
      <span className="col-span-2 ">PRODUCT</span>
      <span className="text-center">QUANTITY</span>
      <span className="text-center">AVAILABILITY</span>
      <span className="text-center">PRICE</span>
      <span className="text-center">TOTAL PRICE</span>
    </div>
  );
}
