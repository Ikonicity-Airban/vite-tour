import { Button, Card } from "flowbite-react";
import { truncateString } from "../api/helper";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

type Props = {
  position: number;
  info: string;
};
const ServicesCard = ({ position, info }: Props) => {
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
        className={`-mb-20
         h-40 w-40  tablet:hidden z-10`}
      ></Card>
      <Card
        className={`h-92 pt-10 tablet:pt-0 text-white max-w-xl flex justify-end min-w-[200px] relative bg-primary ${
          position < 0 ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`${
            position < 0 ? "tablet:mr-10" : "tablet:ml-24"
          } tablet:w-5/6 p-4 leading-loose whitespace-break-spaces`}
        >
          <p>{truncateString(info, 120)}</p>
        </div>
        <div className="w-full flex justify-center">
          <Button className="w-3/5">View</Button>
        </div>
      </Card>
      <Card
        className={`${
          position < 0 ? "tablet:-ml-[100px]" : "tablet:-mr-[100px]"
        }
         h-60 w-60 hidden tablet:flex min-w-[200px] z-10`}
      ></Card>
    </motion.div>
  );
};

export default ServicesCard;
