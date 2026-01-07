"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import { useRef } from "react";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP);

export default function AboutAboutSection() {
  const aboutTextContainerRef = useRef(null);

  const textImageContainerRef01 = useRef(null);
  const textContainerRef01 = useRef(null);
  const imageContainerRef01 = useRef(null);

  const textImageContainerRef02 = useRef(null);
  const textContainerRef02 = useRef(null);
  const imageContainerRef02 = useRef(null);

  useGSAP(
    () => {
      const aboutTextContainer = aboutTextContainerRef.current;

      const textImageContainer01 = textImageContainerRef01.current;
      const textContainer01 = textContainerRef01.current;
      const imageContainer01 = imageContainerRef01.current;

      const textImageContainer02 = textImageContainerRef02.current;
      const textContainer02 = textContainerRef02.current;
      const imageContainer02 = imageContainerRef02.current;

      let mm = gsap.matchMedia();

      mm.add("(min-width: 800px)", () => {
        let tl1 = gsap.timeline({
          scrollTrigger: {
            trigger: textImageContainer01,
            scrub: 2,
            start: "-40% top",
            end: "+=2150 top",
            markers: {
              startColor: "blue",
              endColor: "pink",
              fontSize: "22px",
              fontWeight: "bold",
              indent: 20,
            },
          },
        });
        let tl2 = gsap.timeline({
          scrollTrigger: {
            trigger: textImageContainer01,
            scrub: 8,
            start: "-40% top",
            end: "+=2150 top",
            markers: {
              startColor: "blue",
              endColor: "pink",
              fontSize: "22px",
              fontWeight: "bold",
              indent: 100,
            },
          },
        });
        let tl3 = gsap.timeline({
          scrollTrigger: {
            trigger: textImageContainer02,
            scrub: 2,
            start: "-80% top",
            end: "+=2150 top",
            markers: {
              startColor: "blue",
              endColor: "pink",
              fontSize: "22px",
              fontWeight: "bold",
              indent: 100,
            },
          },
        });
        let tl4 = gsap.timeline({
          scrollTrigger: {
            trigger: textImageContainer02,
            scrub: 11,
            start: "-80% top",
            end: "+=2150 top",
            markers: {
              startColor: "blue",
              endColor: "pink",
              fontSize: "22px",
              fontWeight: "bold",
              indent: 100,
            },
          },
        });

        tl1.to(textContainer01, { y: -450, scale: 0.9 }, 0);
        tl2.to(imageContainer01, { y: -450, scale: 0.9 }, 0);

        tl3.to(textContainer02, { y: -550 }, 0);
        tl4.to(imageContainer02, { y: -650 }, 0);
      });

      // tl1
      //   .fromTo(textContainer01, { scale: 0.85, y: 100 }, { scale: 1, y: 0 })
      //   .fromTo(textContainer01, { scale: 1, y: 0 }, { scale: 0.85, y: -600 });

      // let tl2 = gsap.timeline({
      //   scrollTrigger: {
      //     trigger: textImageContainer01,
      //     scrub: 2,
      //     start: "top top",
      //     end: "+=2000 top",
      //     markers: {
      //       startColor: "black",
      //       endColor: "orange",
      //       fontSize: "22px",
      //       fontWeight: "bold",
      //       indent: 150,
      //     },
      //   },
      // });
      // tl2
      //   .fromTo(imageContainer01, { scale: 0.85, y: 250 }, { scale: 1, y: 0 })
      //   .fromTo(imageContainer01, { scale: 1, y: 0 }, { scale: 0.85, y: -800 });
    },
    { scope: aboutTextContainerRef }
  );

  return (
    <>
      <section ref={aboutTextContainerRef} className="min-h-screen mb-10">
        <div
          ref={textImageContainerRef01}
          className="max-w-[1440px] mx-auto flex flex-col gap-16 px-5 md:px-16 xl:grid xl:grid-cols-[1fr_0.15fr_1fr] xl:gap-28 w-full min-h-screen xl:items-center "
        >
          <div
            ref={textContainerRef01}
            className="flex flex-col justify-center gap-10 w-full"
          >
            <h2 className="text-6xl font-semibold text-center">Who We Are?</h2>
            <div className="text-lg leading-loose text-pretty">
              <p>
                We are a modern sneaker brand built on the belief that
                simplicity, sustainability, and comfort should go hand in hand.
                Our focus is on creating clean, minimal footwear that feels good
                to wear and is gentle on the planet. Every design choice we make
                is intentional—from responsibly sourced materials to timeless
                silhouettes that fit effortlessly into any wardrobe. We’re
                driven by quality, transparency, and a dedication to refining
                the essentials. At our core, we’re a community of creators,
                designers, and sneaker lovers who value thoughtful craftsmanship
                and everyday ease.
              </p>
            </div>
          </div>
          <div
            ref={imageContainerRef01}
            className="relative aspect-square w-full col-span-2"
          >
            <Image
              src="/shoesLanding/White_Sneakers_Falling_Down.jpg"
              alt="sneakers"
              fill
              className="object-cover shadow"
            />
          </div>
        </div>

        {/* 2ND ROW */}
        <div
          ref={textImageContainerRef02}
          className="max-w-[1440px] w-full min-h-screen  mx-auto flex flex-col-reverse gap-16 pt-24 px-5 md:px-16 md:pt-40 xl:grid xl:grid-cols-[1fr_0.15fr_1fr] xl:gap-28 xl:items-center "
        >
          <div
            ref={imageContainerRef02}
            className="relative w-full lg:col-span-2 aspect-square"
          >
            <Image
              src="/shoesLanding/White_Sneakers_Falling_Down.jpg"
              alt="sneakers"
              fill
              className="object-cover shadow"
            />
          </div>

          <div
            ref={textContainerRef02}
            className="flex flex-col justify-center gap-10 w-full"
          >
            <h2 className="text-6xl font-semibold text-center">Our Story</h2>
            <div className="text-lg leading-loose text-pretty">
              <p>
                Our journey began with a frustration: sneakers were either
                stylish but wasteful, or sustainable but lacking comfort and
                design. We wanted all three. So we set out to build a brand that
                redefines what a modern sneaker could be—minimal, durable, and
                consciously made. Starting with small-batch production and
                eco-friendly materials, we focused on creating sneakers that
                feel as good as they look. Over time, our commitment to
                sustainability and comfort evolved into a mission to do better
                with every pair we produce. Today, our story continues with the
                same vision: make sneakers that leave a lasting impression, not
                a lasting footprint.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
