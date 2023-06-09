import { Card } from "flowbite-react";
import image from "../assets/react.svg";

type Props = {
  title?: string;
  rate?: string;
  price?: string;
  source?: string;
  person?: number;
  days?: number;
};

function PremiumCard({
  source = image,
  price = "#45000",
  rate = "4.5",
  title = "Enugu",
  days = 30,
  person = 7,
}: Props) {
  return (
    <div className="rounded card ring-2 ring-[#d4b400] overflow-hidden border bg-white mb-2 text-sm">
      <img className="w-full" src={source} alt="" />
      <div className="p-4">
        <div className="flex justify-between mb-3">
          <small className="m-0">
            <i className="fa fa-map-marker-alt text-primary mr-2"></i>
            {title}
          </small>
          <small className="m-0">
            <i className="fa fa-calendar-alt text-primary mr-2"></i>
            {days} days
          </small>
          <small className="m-0">
            <i className="fa fa-user text-primary mr-2"></i>
            {person} Person
          </small>
        </div>
        <a className="text-decoration-none" href="">
          {}
        </a>
        <div className="border-t-2 mt-4 pt-4">
          <div className="flex justify-between">
            <h6 className="m-0">
              <i className="fa fa-star text-primary mr-2"></i>
              {rate} <small>(250)</small>
            </h6>
            <h5 className="m-0">{price}</h5>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PremiumCard;
