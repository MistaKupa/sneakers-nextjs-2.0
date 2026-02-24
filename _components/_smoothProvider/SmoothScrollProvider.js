"use client";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import ScrollTrigger from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { useRef } from "react";
if (typeof window !== "undefined") {
  gsap.registerPlugin(useGSAP);
}
export default function SmoothScrollProvider({ children }) {
  const smoother = useRef(null);
  const pathname = usePathname();
  useGSAP(
    () => {
      gsap.registerPlugin(useGSAP, ScrollTrigger, ScrollSmoother);
      smoother.current = ScrollSmoother.create({
        smooth: 3,
        effects: true,
        smoothTouch: 0.5,
      });

      ScrollTrigger.refresh();
    },
    { dependencies: [pathname], revertOnUpdate: true }
  );
  return (
    <div id="smooth-wrapper">
      <div id="smooth-content">{children}</div>
    </div>
  );
}
