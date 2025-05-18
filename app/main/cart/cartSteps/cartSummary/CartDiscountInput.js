import { useState } from "react";

export default function CartDiscountInput() {
  const [selectedOption, setSelectedOption] = useState("coupon");
  const [coupon, setCoupon] = useState("");

  {
    /*
    const [isic, setIsic] = useState("");
  
    */
  }

  const [couponeApplied, setCouponApplied] = useState();
  const [couponMessage, setCouponMessage] = useState("");

  function handleApplyCoupon() {
    if (coupon.trim() === "DISCOUNT10") {
      setCouponApplied(true);
      setCouponMessage("Coupon applied succesfully!");
    } else {
      setCouponApplied(false);
      setCouponMessage("Invalid coupon code.");
    }
  }

  return (
    <div className="flex flex-col justify-center gap-3">
      <div className="flex items-center justify-start gap-10 text-dark-500">
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="discountCoupon"
            name="coupon"
            checked={selectedOption === "coupon"}
            onChange={() => setSelectedOption("coupon")}
            className="w-5 h-5 accent-newPrimary"
          />
          <label htmlFor="discountCoupon">Discount Coupon</label>
        </div>

        {/*SET CHECKED TO ISIC LATER*/}
        <div className="flex items-center gap-2">
          <input
            type="radio"
            id="isic"
            name="coupon"
            checked={selectedOption === "coupon"}
            onChange={() => setSelectedOption("isic")}
            className="w-5 h-5 accent-newPrimary"
          />
          <label htmlFor="isic">ISIC Card</label>
        </div>
      </div>

      {/*COUPON INPUT */}
      <div className="flex items-center justify-start gap-2">
        <input
          type="text"
          placeholder="Enter discount code..."
          value={coupon}
          onChange={(e) => setCoupon(e.target.value.toUpperCase())}
          className="w-72 h-10 pl-2 bg-dark-200 border focus:outline-newPrimary rounded-md"
        />

        <button
          className="bg-newPrimary bg-opacity-70 text-newWhite h-10 w-20 rounded-md"
          onClick={handleApplyCoupon}
        >
          Apply
        </button>
      </div>

      <div className="min-h-[24px] mt-2">
        <p className={`${couponeApplied ? "text-green-600" : "text-red-600"}`}>
          {couponMessage}
        </p>
      </div>
    </div>
  );
}
