"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import FeaturedProductCard from "../../featuredProductCard/FeaturedProductCard";
import { Product } from "@/types/product.types";

gsap.registerPlugin(useGSAP, ScrollSmoother, ScrollTrigger);

export default function KidStylesSection({
  kidStyles,
}: {
  kidStyles: Product[];
}) {
  const kidStylesContainerRef = useRef(null);
  const kidStylesBackgroundRef = useRef(null);
  const kidStylesContentContainerRef = useRef(null);

  useGSAP(
    () => {
      const kidStylesBackground = kidStylesBackgroundRef.current;
      const kidStylesContentContainer = kidStylesContentContainerRef.current;

      let tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: kidStylesBackground,
          pin: true,
          pinSpacing: false,
          scrub: 0.2,
          start: "top top",
          end: "+=1890 top",
          // markers: {
          //   startColor: "blue",
          //   endColor: "pink",
          //   fontSize: "22px",
          //   fontWeight: "bold",
          //   indent: 20,
          // },
        },
      });

      tl1.fromTo(kidStylesBackground, { scale: 1 }, { scale: 1.15 });

      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: kidStylesContentContainer,
          scrub: 0.2,
          start: "-120% top",
          end: "bottom top",
          // markers: true,
        },
      });

      tl2
        .fromTo(
          kidStylesContentContainer,
          { scale: 0.8, y: 50 },
          { scale: 1, y: 0 },
        )
        .fromTo(
          kidStylesContentContainer,
          { scale: 1, y: 0 },
          { scale: 0.8, y: -50 },
        );
    },
    { scope: kidStylesContainerRef },
  );

  return (
    <section
      ref={kidStylesContainerRef}
      className="pink-section relative w-full min-h-screen mx-auto"
    >
      <div
        ref={kidStylesBackgroundRef}
        className="absolute w-full h-full z-10 -top-[100%]"
      >
        <Image
          src="/shoesLanding/AdobeStock_1520605313.jpeg"
          alt="Floating Sneaker Banenr"
          fill
          className="object-cover"
        />
      </div>

      <div
        ref={kidStylesContentContainerRef}
        className="relative max-w-[1440px] min-h-screen mx-auto py-20 z-20 px-5 md:px-10 lg:px-16 xl:px-16"
      >
        <div className="w-full min-h-[calc(100vh-10rem)] flex flex-col justify-between gap-8 lg:grid lg:grid-cols-2">
          <div className="flex flex-col gap-8 lg:gap-16 text-dark-100">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold">
              <span className="block">25% Off</span>
              <span className="block">Kids Styles</span>
            </h1>
            <div className="flex flex-col gap-4">
              <p className="text-sm sm:text-base lg:text-lg font-medium">
                Exclusive, limited offer
              </p>
              <div>
                <Link
                  className="uppercase text-newPrimary text-sm font-bold bg-dark-100 px-3 py-2 rounded-full"
                  href=""
                >
                  Shop Now
                </Link>
              </div>
            </div>
          </div>

          {/*Featured Product Card*/}
          <div className="flex items-end justify-center lg:justify-end">
            <FeaturedProductCard products={kidStyles} />
          </div>
        </div>
      </div>
    </section>
  );
}
