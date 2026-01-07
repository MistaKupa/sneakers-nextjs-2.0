"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP);

export default function AboutBannerSection() {
  const bannerSectionRef = useRef(null);
  const bannerContainerRef = useRef(null);
  const bannerImageRef = useRef(null);

  useGSAP(
    () => {
      const bannerContainer = bannerContainerRef.current;
      const bannerImage = bannerImageRef.current;
      let tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: bannerContainer,
          scrub: 2,
          start: "top top",
          end: "bottom top",
          markers: {
            startColor: "black",
            endColor: "orange",
            fontSize: "22px",
            fontWeight: "bold",
            indent: 150,
          },
        },
      });
      tl1.to(bannerImage, { scale: 1.1 });
    },
    { scope: bannerSectionRef }
  );

  return (
    <section ref={bannerSectionRef} className="h-screen">
      <div ref={bannerContainerRef} className="relative w-full h-3/4 z-0">
        <Image
          ref={bannerImageRef}
          src="/shoesLanding/White_Sneakers_Falling_Down.jpg"
          alt="imagos"
          fill
          className="object-cover shadow"
        />

        <div className="w-full max-w-[1440px] h-full mx-auto flex justify-center items-center">
          <h1 className="absolute text-6xl lg:text-8xl font-semibold">
            About Us
          </h1>
        </div>
      </div>
    </section>
  );
}
