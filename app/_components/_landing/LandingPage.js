"use client";

import { useEffect, useRef, useState } from "react";
import Description from "./Description";
import sneakers from "@/data/landingSneakers";
import SizesSelector from "./SizesSelector";
import ColorSelector from "./ColorSelector";
import SneakerImage from "./SneakerImage";
import { useCart } from "@/app/_context/CartContext";

export default function LandingPage() {
  const [current, setCurrent] = useState(0);
  const intervalRef = useRef();

  const { setCartColor } = useCart();

  useEffect(() => {
    if (!intervalRef.current) {
      intervalRef.current = setInterval(() => {
        setCurrent((prev) => (prev + 1) % sneakers.length);
      }, 6000);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
    };
  }, []);

  const resetInterval = () => {
    clearInterval(intervalRef.current);
    intervalRef.current = null;
  };

  useEffect(() => {
    setCartColor(current);
  }, [current, setCartColor]);

  useEffect(() => {
    return () => {
      setCartColor("bg-newPrimary");
    };
  }, [setCartColor]);

  const currentSneaker = sneakers[current];

  return (
    <section className="w-full h-full my-12 lg:my-16 xl:my-40 px-5 md:px-10 md:overflow-hidden xl:overflow-visible">
      <div className="w-full flex flex-col items-center gap-7 lg:grid lg:grid-cols-2 lg:gap-0 xl:items-start xl:justify-items-center">
        {/* LEFT COLUMN (Description + Selectors) */}
        <div className="order-1 lg:order-1 w-full flex flex-col gap-5 px-3 xl:gap-7">
          <Description currentSneaker={currentSneaker} />

          {/* Show only on large screens */}
          <div className="hidden lg:flex flex-col gap-3 xl:flex-row">
            <SizesSelector borderColor={currentSneaker.borderColor} />
            <ColorSelector
              setCurrent={setCurrent}
              resetInterval={resetInterval}
            />
          </div>
        </div>

        {/* RIGHT COLUMN (Image) */}
        <div className="order-2 lg:order-2 w-[15rem] h-[15rem] sm:w-[19rem] sm:h-[19rem] md:w-[35rem] md:h-[35rem] lg:w-[28rem] lg:h-[28rem] xl:w-11/12 xl:h-11/12 mt-5 md:mt-10 lg:mt-0">
          <SneakerImage currentSneaker={currentSneaker} />
        </div>

        {/* MOBILE-ONLY SELECTORS BELOW IMAGE */}
        <div className="order-3 lg:hidden w-full flex flex-col gap-3 px-3">
          <SizesSelector borderColor={currentSneaker.borderColor} />
          <ColorSelector
            setCurrent={setCurrent}
            resetInterval={resetInterval}
          />
        </div>
      </div>
    </section>
  );
}
