"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";
import { IoCloudyOutline, IoGridOutline, IoLeafOutline } from "react-icons/io5";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP);

export default function AboutFeaturesSection() {
  const featuresSectionContainerRef = useRef(null);
  const featuresBackgroundRef = useRef(null);
  const sustainableRef = useRef(null);
  const comfortableRef = useRef(null);
  const minimalRef = useRef(null);

  useGSAP(
    () => {
      const featuresSection = featuresSectionContainerRef.current;
      const featuresBackground = featuresBackgroundRef.current;
      const sustainable = sustainableRef.current;
      const comfortable = comfortableRef.current;
      const minimal = minimalRef.current;

      let mm = gsap.matchMedia();

      // DESKTOP ANIMATION
      mm.add("(min-width: 800px)", () => {
        let tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: featuresSection,
            scrub: 3,
            start: "-80% top",
            end: "90% top",
            // markers: {
            //   startColor: "black",
            //   endColor: "orange",
            //   fontSize: "22px",
            //   fontWeight: "bold",
            //   indent: 150,
            // },
          },
        });
        let tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: featuresSection,
            scrub: 3,
            pin: true,
            start: "top top",
            end: "120% top",
            // markers: {
            //   startColor: "black",
            //   endColor: "black",
            //   fontSize: "22px",
            //   fontWeight: "bold",
            //   indent: 150,
            // },
          },
        });
        tl1.fromTo(
          featuresBackground,
          { opacity: 0, height: 0 },
          { opacity: 1, height: 700 }
        );
        tl1.fromTo(
          sustainable,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1 }
        );
        tl1.fromTo(
          comfortable,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1 }
        );
        tl1.fromTo(minimal, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1 });
      });

      // MOBILE ANIMATION
      mm.add("(max-width: 799px)", () => {
        let tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: featuresSection,
            scrub: 3,
            start: "-30% top",
            end: "bottom top",
            // markers: {
            //   startColor: "green",
            //   endColor: "orange",
            //   fontSize: "22px",
            //   fontWeight: "bold",
            //   indent: 150,
            // },
          },
        });
        let tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: featuresSection,
            scrub: 3,
            pin: true,
            start: "top top",
            end: "70% top",
            // markers: {
            //   startColor: "black",
            //   endColor: "black",
            //   fontSize: "22px",
            //   fontWeight: "bold",
            //   indent: 150,
            // },
          },
        });
        tl1.fromTo(featuresBackground, { opacity: 0 }, { opacity: 1 });
        tl1.fromTo(
          sustainable,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1 }
        );
        tl1.fromTo(
          comfortable,
          { opacity: 0, scale: 0 },
          { opacity: 1, scale: 1 }
        );
        tl1.fromTo(minimal, { opacity: 0, scale: 0 }, { opacity: 1, scale: 1 });
      });
    },

    { scope: featuresSectionContainerRef }
  );

  return (
    <section
      ref={featuresSectionContainerRef}
      className="min-h-screen flex items-center text-dark-200 my-60 lg:h-screen lg:mb-20"
    >
      <div
        ref={featuresBackgroundRef}
        className="w-full h-full lg:h-3/4 bg-newPrimary shadow "
      >
        <div className="w-full h-full max-w-[1440px] mx-auto flex flex-col items-center justify-between lg:flex-row ">
          <div
            ref={sustainableRef}
            className="h-screen lg:h-full flex flex-col items-center justify-center gap-5 border-dark-100 border-b-4 py-16 lg:border-b-0 lg:py-0"
          >
            <IoLeafOutline size={100} />
            <h3 className="text-4xl font-light">Sustainable</h3>
            <div className="px-16 text-center">
              <p>
                We use eco-friendly materials and responsible manufacturing to
                reduce our footprint. Every pair is designed with the planet in
                mind.
              </p>
            </div>
          </div>
          <div
            ref={comfortableRef}
            className="h-screen lg:h-full flex flex-col items-center justify-center gap-5 border-dark-100 border-b-4 py-16 lg:border-b-0 lg:py-0"
          >
            <IoCloudyOutline size={100} />
            <h3 className="text-4xl font-light">Comfortable</h3>
            <div className="px-16 text-center">
              <p>
                Engineered for everyday wear, our sneakers prioritize soft
                cushioning, natural movement, and all-day comfort.
              </p>
            </div>
          </div>
          <div
            ref={minimalRef}
            className="h-screen lg:h-full flex flex-col items-center justify-center gap-5 py-16 lg:border-b-0 lg:py-0"
          >
            <IoGridOutline size={100} />
            <h3 className="text-4xl font-light">Minimal Design</h3>
            <div className="px-16 text-center">
              <p>
                Clean, timeless, and effortless. We focus on essential shapes
                and thoughtful details—nothing extra, just what matters.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
