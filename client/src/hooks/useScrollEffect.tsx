import { useState, useEffect } from "react";

/**
 * Hook that tracks whether user has scrolled beyond a certain point
 * @param threshold Number of pixels to scroll before the effect triggers
 * @returns Boolean indicating if the scroll position has passed the threshold
 */
export const useScrollEffect = (threshold: number = 0): boolean => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > threshold;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    // Check initial scroll position
    handleScroll();

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll, { passive: true });

    // Clean up
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled, threshold]);

  return scrolled;
};

export default useScrollEffect;
