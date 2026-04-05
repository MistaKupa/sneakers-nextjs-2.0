"use client";

import { ProductDetailsPublic } from "@/types/product.types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";
import FeaturedProductCard from "../../featuredProductCard/FeaturedProductCard";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

export default function BannerSection({
  products,
}: {
  products: ProductDetailsPublic[];
}) {
  const bannerContainerRef = useRef(null);
  const imageContainerRef = useRef(null);
  const bannerContentRef = useRef(null);

  useGSAP(
    () => {
      const bannerContainer = bannerContainerRef.current;
      const bannerContent = bannerContentRef.current;
      const imageContainer = imageContainerRef.current;

      let tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: imageContainer,
          scrub: 0.5,
          pin: true,
          pinSpacing: false,
          start: "top top",
          end: "bottom top",
          // markers: true,
        },
      });

      tl1.fromTo(imageContainer, { scale: 1 }, { scale: 1.15 });

      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: bannerContainer,
          scrub: 0.5,
          start: "top top",
          end: "bottom top",
        },
      });

      tl2.fromTo(bannerContent, { scale: 1 }, { scale: 0.85 });
    },
    { scope: bannerContainerRef },
  );

  return (
    <section
      ref={bannerContainerRef}
      className="pink-section relative w-full min-h-screen mx-auto pb-10"
    >
      <div ref={imageContainerRef} className="absolute w-full h-full z-0">
        <Image
          src="/shoesLanding/AdobeStock_1520605313.jpeg"
          alt="Floating Sneaker Banner"
          fill
          priority
          className="object-cover"
          onLoad={() => ScrollTrigger.refresh()}
        />
      </div>

      <div className="relative max-w-[1440px] min-h-screen mx-auto py-20 px-5 md:px-10 lg:px-16 xl:px-16">
        <div
          ref={bannerContentRef}
          className="w-full min-h-[calc(100vh-10rem)] flex flex-col justify-between gap-8 lg:grid lg:grid-cols-2"
        >
          <div className="bannerText flex flex-col gap-5 text-dark-100 mt-10">
            <h1 className="text-4xl sm:text-6xl lg:text-8xl font-bold">
              Sneakers Epic
            </h1>
            <p className="sm:text-base lg:text-lg font-medium">
              Step into the future of streetwear with bold design and
              <br className="hidden sm:block" />
              unmatched performance.
            </p>
          </div>

          <div className="flex items-end justify-center lg:justify-end">
            <FeaturedProductCard products={products} />
          </div>
        </div>
      </div>
    </section>
  );
}
