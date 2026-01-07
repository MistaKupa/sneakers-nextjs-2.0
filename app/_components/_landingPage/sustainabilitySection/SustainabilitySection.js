"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);

export default function SustainabilitySection() {
  const sustainContainerRef = useRef(null);
  const sustainBackgroundRef = useRef(null);

  useGSAP(
    () => {
      const sustainBackground = sustainBackgroundRef.current;

      let tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: sustainBackground,
          start: "-80% top",
          end: "+=1820 top",
          scrub: 0.2,
          pin: true,
          markers: true,
        },
      });

      tl1
        .fromTo(".sustainHeading", { scale: 0.8 }, { scale: 1 })
        .fromTo(".sustainHeading", { scale: 1 }, { scale: 0.8 });

      gsap.to(".masked-text", {
        backgroundPosition: "50% 100%",
        ease: "none",
        scrollTrigger: {
          trigger: sustainBackground,
          start: "-80% top",
          end: "+=1500 top",
          scrub: true,
        },
      });
    },
    { scope: sustainContainerRef }
  );

  return (
    <section
      ref={sustainContainerRef}
      className="relative flex items-center justify-center min-h-screen bg-white overflow-hidden border-t border-newPrimary z-20"
    >
      {/* Background image */}
      <div ref={sustainBackgroundRef} className="absolute inset-0">
        <Image
          src="/shoesLanding/Landing_Sustainability.jpg"
          alt="Sneaker Background"
          fill
          className="w-full h-full bg-contain"
        />
      </div>

      {/* White overlay */}
      <div className="absolute inset-0 bg-dark-100 "></div>

      {/* Masked heading */}
      <div className="masked-text sustainHeading relative z-10 text-center font-extrabold text-transparent bg-clip-text bg-sustainability bg-cover bg-center uppercase leading-none">
        <h1 className="text-[13vw]">Commited</h1>
        <h1 className="text-[11vw]">Sustainability</h1>
        <div className="absolute top-10 left-3.5 md:top-20 md:left-7 lg:top-28 lg:left-10 xl:top-52 xl:left-20 text-[#A580AB] text-[1.5vw]">
          <h1>To</h1>
        </div>
      </div>
    </section>
  );
}
