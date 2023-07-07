import { ReactNode } from "react";
import { Link } from "react-router-dom";
import { truncateString } from "../api/helper";
import { Button } from "flowbite-react";
// import "../App.css";
interface ICardProps {
  heading?: string;
  source?: string;
  children?: ReactNode;
  place?: string;
  about?: string;
}

function CardComponent({ source, place, about = "" }: ICardProps) {
  return (
    <div className="max-w-sm text-sm leading-snug p-4 border border-gray-200 rounded shadow md:p-6 dark:border-gray-700 relative card overflow-hidden">
      <div className="flex items-center justify-center h-56 backdrop-blur-sm mb-4 bg-gray-300 rounded dark:bg-gray-700 ring-[.5rem] dark:ring-slate-800 ring-[whitesmoke] overflow-hidden">
        <img
          className="w-full h-full hover:scale-105 duration-150"
          src={source}
          alt=""
          placeholder="Hi"
          loading="lazy"
        />
      </div>

      <div className="mt-10">
        <h4 className="font-semibold dark:text-white">{place}</h4>
      </div>
      <div className="py-4">
        <p>
          {truncateString(about, 50)}
          <span>see more</span>
        </p>
      </div>
      <Button outline className="w-full">
        View More
      </Button>
    </div>
  );
}

export default CardComponent;
