"use client";

import { useNavColor } from "@/app/_context/NavColorContext";
import { useEffect } from "react";

const useSectionColorChange = (ref, textColorForNav) => {
  const { setTextColorClass } = useNavColor();

  useEffect(() => {
    const observerRef = ref.current;
    const headerHeight = "50px";

    const observerOptions = {
      root: null,
      rootMargin: `0px 0px -${headerHeight} 0px`,
      threshold: 0,
    };

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setTextColorClass(textColorForNav);
      }
    }, observerOptions);

    if (observerRef) {
      observer.observe(observerRef);
    }

    return () => {
      if (observerRef) {
        observer.unobserve(observerRef);
      }
    };
  }, [ref, textColorForNav, setTextColorClass]);
};

export default useSectionColorChange;
