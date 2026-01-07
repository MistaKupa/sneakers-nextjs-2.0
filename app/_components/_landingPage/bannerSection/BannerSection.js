"use client";

import { useGSAP } from "@gsap/react";
import { motion } from "framer-motion";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import Button from "../../UI/Button";
import FeaturedProductCard from "../../featuredProductCard/FeaturedProductCard";
import useSectionColorChange from "@/hooks/useSectionColorChange";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, useGSAP);

export default function BannerSection({ products }) {
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
    { scope: bannerContainerRef }
  );

  return (
    <section
      ref={bannerContainerRef}
      className="pink-section relative w-full min-h-screen mx-auto"
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

      <div className="relative max-w-[1440px] h-screen mx-auto py-20 px-5 md:px-10 lg:px-16 xl:px-16">
        <div
          ref={bannerContentRef}
          className="w-full h-full flex flex-col justify-between lg:grid lg:grid-cols-2 "
        >
          <div className="bannerText flex flex-col gap-5 text-dark-100 mt-10">
            <h1 className="text-6xl lg:text-8xl font-bold">Sneakers Epic</h1>
            <p className="lg:text-lg font-medium">
              Step into the future of streetwear with bold design and <br />
              unmatched performance.
            </p>
          </div>

          {/*Featured Product Card */}
          <div className="flex items-end justify-end">
            <FeaturedProductCard products={products} />
          </div>
        </div>
      </div>
    </section>
  );
}
