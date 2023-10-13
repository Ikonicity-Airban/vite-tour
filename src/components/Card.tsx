import { Button } from "flowbite-react";
import { ReactNode } from "react";
import { truncateString } from "../api/helper";

interface ICardProps {
  source: {
    heading?: string;
    source?: string;
    children?: ReactNode;
    name?: string;
    about: string;
  };
}

function CardComponent({ source: { source, about, name: place } }: ICardProps) {
  return (
    <div className="max-w-sm min-h-full justify-between min-w-[24rem] h-full text-sm leading-snug flex flex-col p-4 border border-gray-200 rounded shadow md:p-6 dark:border-gray-700 relative card overflow-hidden">
      <div className="flex items-center justify-center h-56 backdrop-blur-sm mb-4 bg-gray-300 rounded dark:bg-gray-700 dark:ring-slate-800 ring-[whitesmoke] overflow-hidden">
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
          {truncateString(about, 70)}
          <span className="text-gray-400 text-sm">see more</span>
        </p>
      </div>
      <div className="bottom-button">
        <Button
          gradientDuoTone="greenToBlue"
          className="hover:text-base w-full"
        >
          Take a tour now
        </Button>
      </div>
    </div>
  );
}

export default CardComponent;
