import React, { useEffect, useState } from "react";

import { motion } from "framer-motion";

interface Props {
  threshold: number;
}

const ScrollToTopButton: React.FC<Props> = ({ threshold }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
    };
    const timerId = setTimeout(() => {
      setIsVisible(() => false);
    }, 2000);
    window.addEventListener("scroll", handleScroll);
    return () => {
      clearTimeout(timerId);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [threshold]);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      className="fixed bottom-4 right-4 bg-gray-800 p-3 rounded-full shadow-lg text-white focus:outline-none focus:ring-2 focus:ring-gray-600"
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <i className="fa fa-arrow-up"></i>
    </motion.button>
  );
};

export default ScrollToTopButton;
