"use client";

import aboutTeam from "@/data/aboutTeam";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { stagger } from "motion";
import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import {
  IoLogoFacebook,
  IoLogoInstagram,
  IoLogoLinkedin,
  IoLogoTwitter,
} from "react-icons/io5";

gsap.registerPlugin(ScrollSmoother, ScrollTrigger, useGSAP);

export default function AboutTeamSection() {
  const teamSectionContainerRef = useRef(null);

  useGSAP(
    () => {
      const teamSectionContainer = teamSectionContainerRef.current;
      let tl1 = gsap.timeline({
        scrollTrigger: {
          trigger: teamSectionContainer,
          scrub: 7,
          start: "-90% top",
          end: "+=500 top",
          // markers: {
          //   startColor: "purple",
          //   endColor: "black",
          //   fontSize: "30px",
          // },
        },
      });
      tl1.fromTo(
        ".mainHeading",
        { opacity: 0, scale: 0.9, y: 500 },
        { opacity: 1, scale: 1, y: 0 }
      );
      let tl2 = gsap.timeline({
        scrollTrigger: {
          trigger: teamSectionContainer,
          pin: true,
          scrub: 2,
          start: "top top",
          end: "+=2500 top",
          // markers: {
          //   startColor: "purple",
          //   endColor: "brown",
          //   fontSize: "30px",
          // },
        },
      });
      tl2.fromTo(".subHeading", { opacity: 0 }, { opacity: 1, delay: 0.2 }, 0);
      tl2.fromTo(
        ".teamCards",
        { opacity: 0 },
        {
          opacity: 1,
          delay: 0.2,
          ease: "power3.inOut",
          stagger: {
            each: 0.15,
            from: "center",
            ease: "power3.inOut",
          },
        },
        0
      );
    },
    { scope: teamSectionContainerRef }
  );

  return (
    <section
      ref={teamSectionContainerRef}
      className="min-h-screen lg:h-screen mb-28 pt-10 bg-white"
    >
      <div className="w-full h-full max-w-[1440px] mx-auto flex flex-col gap-20 px-5 md:px-16">
        <div className="w-full flex flex-col items-center gap-7">
          <h2 className="mainHeading text-6xl font-semibold text-center lg:text-left">
            Who Made It?
          </h2>
          <h3 className="subHeading text-4xl font-light">Meet The Team</h3>
        </div>

        <div className="w-full flex flex-col border-t lg:border-t-0 lg:grid lg:grid-cols-3 lg:gap-16 ">
          {aboutTeam.map((person, i) => (
            <div
              key={i}
              className="teamCards flex flex-col gap-8 border-b py-24 lg:border-b-0 lg:py-0"
            >
              <div className="relative aspect-[5/6]">
                <Image
                  src={person.photo}
                  alt={`Photo of ${person.name}`}
                  fill
                  className="object-cover rounded-sm shadow"
                />
              </div>
              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-1">
                  <h4 className="text-2xl ">{person.name}</h4>
                  <h5 className="text-lg text-dark-400 font-light">
                    {person.position}
                  </h5>
                </div>
                <div className="flex gap-4 text-dark-400">
                  <Link href={person.socials.instagram}>
                    <IoLogoInstagram size={20} />
                  </Link>
                  <Link href={person.socials.facebook}>
                    <IoLogoFacebook size={20} />
                  </Link>
                  <Link href={person.socials.twitter}>
                    <IoLogoTwitter size={20} />
                  </Link>
                  <Link href={person.socials.linkedin}>
                    <IoLogoLinkedin size={20} />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
