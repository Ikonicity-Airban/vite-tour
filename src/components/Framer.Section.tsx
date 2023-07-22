import { useEffect, useRef, useState } from "react";
import { AnimationDefinition, motion, useAnimation } from "framer-motion";
import { IPlace } from "../api/@types";
import { Link } from "react-router-dom";
import CardComponent from "./Card";
import { shuffleArray } from "../api/helper";

interface GridInViewAnimationProps {
  list: IPlace[];
}

function GridInViewAnimation({ list }: GridInViewAnimationProps) {
  const [hasPlayed, setHasPlayed] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const gridRef = useRef<HTMLDivElement>(null);
  const controls = useAnimation();

  useEffect(() => {
    const handleScroll = () => {
      const gridElement = gridRef.current;
      if (gridElement) {
        const gridTop = gridElement.getBoundingClientRect().top;
        setIsVisible(gridTop <= window.innerHeight / 2);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (isVisible && !hasPlayed) {
      controls
        .start({
          opacity: 1,
          transition: { duration: 0.5 },
          staggerChildren: 0.1, // stagger delay between children
        } as AnimationDefinition) // type assertion
        .then(() => setHasPlayed(true));
    }
  }, [isVisible, hasPlayed, controls]);

  return (
    <motion.div
      className="grid-container snap-y"
      initial={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      ref={gridRef}
    >
      <motion.div
        className="grid-card gap-6"
        // animate={controls}
        layout
        variants={{
          hidden: { opacity: 1, scale: 0 },
          visible: {
            opacity: 1,
            scale: 1,
            transition: {
              delayChildren: 0.3,
              staggerChildren: 0.2,
            },
          },
        }}
        initial="hidden"
        animate={isVisible || !hasPlayed ? "visible" : "hidden"}
      >
        {list.slice(0, 12).map((source, index) => (
          <motion.div
            key={index}
            className="h-full"
            variants={{
              hidden: { y: 20, opacity: 0 },
              visible: {
                y: 0,
                opacity: 1,
              },
            }}
          >
            {" "}
            <Link
              to={`/tours/${source.name.split(" ").join("-")}`}
              state={source}
              key={source.about}
            >
              <CardComponent
                source={{
                  ...source,
                  source: shuffleArray(source.images)[0],
                }}
              />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
}

export default GridInViewAnimation;
