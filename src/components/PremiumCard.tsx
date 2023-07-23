import { Button, Card, Rating } from "flowbite-react";

import LoadingSection from "./LoadingSection";
import { Plan } from "../api/@types";
import Section from "./Section";
import { useFetchCollection } from "../api/fetchCollections";

const PlanCard: React.FC<{ plan: Plan }> = ({ plan }) => {
  const { title, description, image, price, rate, days, person, color } = plan;
  return (
    <Card
      className={
        "rounded-lg shadow-lg h-full overflow-hidden text-center max-w-sm"
      }
    >
      <i
        className={image + " text-7xl text-center w-full"}
        style={{ color }}
      ></i>
      <div className="p-6  flex flex-col justify-between h-full">
        <h2 className="mb-10 font-light" style={{ color }}>
          {title}
        </h2>
        <p className="mb-4 font-medium text-lg">{description}</p>
        <ul className="mb-4 space-y-3">
          <li className="flex items-center gap-2  text-sm mb-1">
            <Rating>
              <Rating.Star></Rating.Star>
            </Rating>
            Rating: {rate}
          </li>
          <li className="flex items-center gap-2  text-sm mb-1">
            <i className="fa fa-clock-o"></i>
            <span>Duration: {days} days</span>
          </li>
          <li className="flex gap-2 items-center  text-sm mb-1">
            <i className="fa fa-users"></i>
            <span>Number of people: {person}</span>
          </li>
          <li className={" py-6 "}>
            <h3 style={{ color }} className="font-bold">
              Price: {price}
            </h3>
          </li>
        </ul>
        <Button className="hover:bg-blue-700 text-white font-bold w-full px-4 rounded">
          Book Now
        </Button>
      </div>
    </Card>
  );
};

export default function PremiumCardList() {
  const plans = useFetchCollection<Plan>("plans");
  return (
    <div className="w-full">
      <Section
        title=" check it out"
        subtitle="Our Amazing Tourist Package Plans"
      >
        <LoadingSection arrLen={3} />
        <div className="flex flex-wrap gap-10 justify-center">
          {plans.map((plan: Plan) => (
            <PlanCard plan={plan} />
          ))}
          {/* <PlanCard plan={premiumPlan} />
          <PlanCard plan={additionalPlan} /> */}
        </div>
      </Section>
    </div>
  );
}
