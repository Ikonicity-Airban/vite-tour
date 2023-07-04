import { Tilt } from "react-tilt";
import image from "../assets/react.svg";
import { tiltOptions } from "../api/helper";

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
    <Tilt option={tiltOptions}>
      <div className="rounded p-4 card max-w-[350px] overflow-hidden border border-gray-800 mb-2 text-sm">
        <div className="h-44 object-contain">
          <img className="h-full w-full" src={source} alt="" />
        </div>
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
    </Tilt>
  );
}

export default PremiumCard;
