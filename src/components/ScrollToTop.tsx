import React, { useState } from "react";
import { motion } from "framer-motion";
import { Variants } from "framer-motion";

const variants: Variants = {
  hidden: {
    opacity: 0,
    pointerEvents: "none",
  },
  visible: {
    opacity: 1,
    pointerEvents: "auto",
  },
};
function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  function handleScroll() {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    setIsVisible(scrollTop > 0);
  }

  function handleClick() {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  }

  React.useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.button
      className="scroll-to-top"
      variants={variants}
      initial="hidden"
      animate={isVisible ? "visible" : "hidden"}
      onClick={handleClick}
    >
      Scroll to top
    </motion.button>
  );
}

export default ScrollToTop;
