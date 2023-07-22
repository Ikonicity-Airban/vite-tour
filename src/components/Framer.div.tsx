import React, { useEffect, useRef, useState } from "react";
import { motion, useAnimation } from "framer-motion";

interface DivScrollToViewProps {
  children: React.ReactNode;
}

function DivScrollToView({ children }: DivScrollToViewProps) {
  const [isVisible, setIsVisible] = useState(false);
  const divRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const divElement = divRef.current;
      if (divElement) {
        const divTop = divElement.getBoundingClientRect().top;
        setIsVisible(divTop <= window.innerHeight / 2);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible) {
      controls.start({
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 10, mass: 0.3 },
      });
    }
  }, [isVisible, controls]);

  return (
    <motion.div
      className="div-container"
      animate={controls}
      initial={{ y: 150 }}
      transition={{ duration: 0.5 }}
      ref={divRef}
    >
      {children}
    </motion.div>
  );
}

export default DivScrollToView;
