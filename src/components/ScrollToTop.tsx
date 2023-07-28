import { useEffect, useState } from "react";

import { FaArrowUpLong } from "react-icons/fa6";
import { motion } from "framer-motion";

interface Props {
  threshold: number;
}

const ScrollToTopButton = ({ threshold }: Props) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsVisible(window.scrollY > threshold);
      // if (!timer)
      //   timer = setTimeout(() => {
      //     setIsVisible(() => false);
      //   }, 4000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      // clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  });

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <motion.button
      className="fixed bottom-4 right-4 h-14
      text-white bg-slate-700 hover:bg-slate-800 focus:outline-none focus:ring-4
       focus:ring-slate-300 font-medium rounded-full text-sm px-3 text-center
        dark:bg-slate-600 dark:hover:bg-slate-700 dark:focus:ring-slate-800 z-50"
      onClick={handleClick}
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0 }}
      transition={{ duration: 0.2 }}
    >
      <FaArrowUpLong />
    </motion.button>
  );
};

export default ScrollToTopButton;
