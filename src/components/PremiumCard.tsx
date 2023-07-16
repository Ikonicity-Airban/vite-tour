import { Tilt } from "react-tilt";
import { tiltOptions } from "../api/helper";
import Section from "./Section";
import { Card } from "flowbite-react";

interface Plan {
  title: string;
  description: string;
  image: string;
  price: string;
  rate: string;
  days: number;
  bg: string;
  person: number;
}

const PlanCard: React.FC<{ plan: Plan }> = ({ plan }) => {
  const { title, description, image, price, rate, days, person, bg } = plan;
  return (
    <Tilt option={tiltOptions}>
      <Card className={"rounded-lg shadow-lg overflow-hidden " + bg}>
        <i className={image + " text-7xl text-center w-full"}></i>
        <div className="p-6">
          <h3 className="text-lg font-medium mb-2">{title}</h3>
          <p className="text-gray-600 text-sm mb-4">{description}</p>
          <ul className="mb-4">
            <li className="flex items-center text-gray-700 text-sm mb-1">
              <svg
                className="w-4 h-4 mr-2 fill-current text-green-500"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M9.293 14.707a1 1 0 001.414 0l5-5a1 1 0 10-1.414-1.414L10 11.586l-3.293-3.293a1 1 0 10-1.414 1.414l4 4z" />
              </svg>
              <span>Rating: {rate}</span>
            </li>
            <li className="flex items-center text-gray-700 text-sm mb-1">
              <svg
                className="w-4 h-4 mr-2 fill-current text-green-500"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M2 7h16v2H2V7zm0 6h16v2H2v-2z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Duration: {days} days</span>
            </li>
            <li className="flex items-center text-gray-700 text-sm mb-1">
              <svg
                className="w-4 h-4 mr-2 fill-current text-green-500"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h14a1 1 0 001-1V5a1 1 0 00-1-1H3zm1 1h12v8H4V5z"
                  clipRule="evenodd"
                />
              </svg>
              <span>Number of people: {person}</span>
            </li>
            <li className="text-gray-700 text-sm mb-1">Price: {price}</li>
          </ul>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Book Now
          </button>
        </div>
      </Card>
    </Tilt>
  );
};

export default function PremiumCardList() {
  const basicPlan: Plan = {
    title: "Enugu Basic",
    description: "A budget-friendly package for exploring Enugu.",
    image: "fas fa-briefcase",
    price: "#45000",
    rate: "4.5",
    days: 30,
    person: 7,
    bg: "bg-blue-400",
  };

  const premiumPlan: Plan = {
    title: "Enugu Premium",
    description: "An exclusive package for a luxurious experience in Enugu.",
    image: "fas fa-crown",
    price: "#150000",
    rate: "5.0",
    days: 30,
    person: 7,
    bg: "bg-amber-500",
  };

  const additionalPlan: Plan = {
    title: "Enugu VIP",
    description:
      "An ultra-luxurious and customized package for the ultimate experience in Enugu.",
    image: "fas fa-gem",
    price: "#500000",
    rate: "5.0",
    days: 30,
    person: 7,
    bg: "bg-gray-400",
  };
  return (
    <Section title="check it out" subtitle="Our Amazing tourist plans">
      <div className="flex justify-center items-center h-screen">
        <div className="grid grid-cols-3 gap-4">
          <PlanCard plan={basicPlan} />
          <PlanCard plan={premiumPlan} />
          <PlanCard plan={additionalPlan} />
        </div>
      </div>
    </Section>
  );
}
