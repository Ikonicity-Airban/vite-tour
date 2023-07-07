import { Card } from "flowbite-react";
import { truncateString } from "../api/helper";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { IService } from "../api/@types";

type Props = {
  position: number;
  detail: IService;
};

const placeholder =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt beatae necessitatibus ducimus consequuntur enim, qui ad iste sint numquam ab, aliquam mollitia quo magni. Iste facere possimus labore! Atque, assumenda.";
const ServicesCard = ({ position, detail: { name, desc, icon } }: Props) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{
        opacity: inView ? 1 : 0,
        y: inView ? 0 : 20,
        x: inView ? 0 : 20 * position,
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
          <p>{truncateString(desc || placeholder, 120)}</p>
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
