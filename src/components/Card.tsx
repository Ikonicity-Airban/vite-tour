import { Button } from "flowbite-react";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
// import "../App.css";
interface ICardProps {
  heading?: string;
  source?: string;
  children?: ReactNode;
  place?: string;
  about?: string;
  id?: string;
}

function CardComponent({ source, children, place, id = "" }: ICardProps) {
  return (
    <div className="hover_card ring-2 h-[400px]  ring-[#c0c0c091] card relative cursor-pointer overflow-hidden rounded-lg shadow-md text-center">
      <Link to={`tours/${id}`} className="">
        <div className="card__overlay absolute inset-0 w-full h-full translate-y-full ">
          {children}
          <Button>Learn More</Button>
        </div>
        <img
          className="w-full h-[80%] object-cover"
          src={source}
          alt=""
          placeholder="Hi"
          loading="lazy"
        />

        <div className="p-6">
          <h4 className="font-semibold dark:text-white">{place}</h4>
        </div>
        <div className="pb-4">
          <div>4</div>
        </div>
      </Link>
    </div>
  );
}

export default CardComponent;
