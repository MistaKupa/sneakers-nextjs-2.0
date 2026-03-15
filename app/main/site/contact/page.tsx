"use client";

import Map from "@/_components/_googleMap/Map";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import {
  IoAtCircleOutline,
  IoCallOutline,
  IoLocationOutline,
} from "react-icons/io5";

gsap.registerPlugin(useGSAP, ScrollSmoother, ScrollTrigger);

export default function Contact() {
  useGSAP(() => {
    let tl1 = gsap.timeline({
      scrollTrigger: {
        trigger: ".background",
        scrub: 2,
        start: "top top",
        end: "+=1800 bottom",
      },
    });

    tl1.to(".background", { scale: 1.15 });
  });

  return (
    <section className="relative xl:items-end flex w-full min-h-screen xl:h-screen">
      <div className="background absolute w-full h-full z-10">
        <Image
          src="/shoesLanding/White_Sneakers_Falling_Down.jpg"
          alt="imagos"
          fill
          className="object-cover"
        />
      </div>
      <div className="relative w-full max-w-[1440px]  mx-auto z-10 grid gap-5 px-5 my-20 md:gap-10 md:px-16 md:grid-rows-[30rem_30rem_30rem] lg:px-24 xl:h-96 xl:grid-cols-3 xl:grid-rows-[24rem] xl:gap-0 xl:my-0">
        {/* MAP */}
        <div className="bg-dark-300 w-full h-96 md:h-full shadow ">
          <Map />
        </div>

        {/* Contact Info */}
        <div className="bg-dark-200 w-full h-96 md:h-full shadow flex flex-col gap-10 p-16 pb-8">
          <h3 className="text-3xl">Contact us</h3>
          <div className="flex flex-col gap-4">
            <span className="flex gap-5 text-sm font-semibold text-dark-400">
              <IoCallOutline className="text-newPrimary" size={22} />
              <p>000-000-000</p>
            </span>
            <span className="flex gap-5 text-sm font-semibold text-dark-400">
              <IoAtCircleOutline className="text-newPrimary" size={22} />
              <p>fake@sneakers.fake</p>
            </span>
            <span className="flex gap-5 text-sm font-semibold text-dark-400">
              <IoLocationOutline className="text-newPrimary" size={22} />
              <p>Mlynske nivy 5/A, 821 08 Bratislava</p>
            </span>
          </div>
        </div>

        {/* Ask Us */}
        <div className="bg-dark-100 w-full h-96 md:h-full shadow flex flex-col gap-10 p-16 pb-8">
          <h3 className="text-3xl">Ask us</h3>
          <div className="flex flex-col gap-5 w-full h-full">
            <textarea className="w-full h-full  bg-dark-100 border" />
            <button className="bg-newPrimary px-4 py-1 self-end rounded-full text-dark-100 uppercase font-semibold">
              Ask
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
