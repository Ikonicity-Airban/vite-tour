import { Button, Card } from "flowbite-react";
import { truncateString } from "../api/helper";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Link } from "react-router-dom";

type Props = {
  position: number;
  info: string;
  icon: string;
};

const placeholder =
  "Lorem ipsum dolor sit amet consectetur adipisicing elit. Deserunt beatae necessitatibus ducimus consequuntur enim, qui ad iste sint numquam ab, aliquam mollitia quo magni. Iste facere possimus labore! Atque, assumenda.";
const ServicesCard = ({ position, info, icon }: Props) => {
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
      <div
        className={`-mb-20 rounded-2xl overflow-hidden object-fill
         h-40 w-40  tablet:hidden z-10`}
      >
        <img
          src={icon || "vite.svg"}
          alt={icon}
          className="object-cover h-full w-full"
        />
      </div>
      <Card
        className={`h-92 pt-10 tablet:pt-0 text-gray-300 max-w-fit flex justify-end tablet:min-w-[500px] min-w-[280px] relative bg-primary ${
          position < 0 ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`${
            position < 0 ? "tablet:mr-10" : "tablet:ml-24"
          } tablet:w-5/6 p-4 leading-loose whitespace-break-spaces`}
        >
          <p>{truncateString(info || placeholder, 70)}</p>
        </div>
        <Link to="/services">
          <div className="w-full flex justify-center">
            <Button className="w-full md:w-3/5">View</Button>
          </div>
        </Link>
      </Card>
      <div
        className={`${
          position < 0 ? "tablet:-ml-[100px]" : "tablet:-mr-[100px]"
        }
         h-60 w-60 hidden tablet:flex min-w-[200px] z-10  rounded-2xl overflow-hidden`}
      >
        <img
          src={icon || "vite.svg"}
          alt={icon}
          className="w-full h-full object-cover"
        />
      </div>
    </motion.div>
  );
};

export default ServicesCard;
