import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";

import { Card } from "flowbite-react";
import { IService } from "../api/@types";
import { truncateString } from "../api/helper";

type Props = {
  position: number;
  detail: IService;
};

const ServicesCard = ({ position, detail: { name, desc, icon } }: Props) => {
  const [hasPlayed, setHasPlayed] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);

  useEffect(() => {
    if (!hasPlayed) {
      setHasPlayed(true);
    }
  }, [hasPlayed]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: inView || hasPlayed ? 1 : 0,
        y: inView || hasPlayed ? 0 : 20,
        x: inView || hasPlayed ? 0 : 20 * position,
      }}
      transition={{ duration: 1 }}
      ref={ref}
      className={`${
        position > 0 ? "tablet:flex-row-reverse" : ""
      } flex flex-col tablet:flex-row items-center w-full my-10`}
    >
      <Card
        className={`-mb-14 rounded-2xl overflow-hidden 
         h-40 w-40  tablet:hidden z-10 flex items-center justify-center`}
      >
        <img
          src={icon || "vite.svg"}
          alt={icon}
          className="object-contain h-full w-full"
        />
      </Card>
      <Card
        className={` pt-10 tablet:pt-0 text-gray-300 max-w-3xl flex justify-end tablet:min-w-[500px] min-w-[260px] relative bg-primary ${
          position < 0 ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`${
            position < 0 ? "tablet:mr-10" : "tablet:ml-24"
          } tablet:w-5/6 p-4 leading-loose whitespace-break-spaces`}
        >
          <h2>{name}</h2>
          <p>{truncateString(desc, 120)}</p>
        </div>
      </Card>
      <Card
        className={`${
          position < 0 ? "tablet:-ml-[100px]" : "tablet:-mr-[100px]"
        }
         h-40 w-40 hidden tablet:flex min-w-[200px] z-10  rounded-2xl overflow-hidden`}
      >
        <img
          src={icon || "vite.svg"}
          alt={icon}
          className="w-full h-full object-contain"
        />
      </Card>
    </motion.div>
  );
};

export default ServicesCard;
