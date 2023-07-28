import { Button, Card, Rating } from "flowbite-react";
import { FaCheck, FaClock, FaNairaSign, FaUsers } from "react-icons/fa6";
import { IUser, Plan } from "../api/@types";

import LoadingSection from "./LoadingSection";
import Section from "./Section";
import { useFetchCollection } from "../api/fetchCollections";

export const PlanCard: React.FC<{ plan: Plan; user?: IUser }> = ({
  plan,
  // user,
}) => {
  const { title, description, image, price, rate, days, person, color } = plan;

  const alreadySubscribed = true;
  // const alreadySubscribed = userInfo?.plan.title == "title";
  return (
    <Card
      className={
        "rounded-lg shadow-lg h-auto overflow-hidden text-center max-w-sm"
      }
    >
      <i
        className={image + " text-7xl text-center w-full"}
        style={{ color }}
      ></i>
      <div className="p-2  flex flex-col justify-between h-full">
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
            <FaClock />
            <span>Duration: {days} days</span>
          </li>
          <li className="flex gap-2 items-center  text-sm mb-1">
            <FaUsers /> <span>Number of people: {person}</span>
          </li>
          <li className={" py-6 "}>
            <h3
              style={{ color }}
              className="font-bold inline-flex items-center space-x-2"
            >
              Price: <FaNairaSign className="ml-2 text-xl" />
              {price}
            </h3>
          </li>
        </ul>
        <Button outline pill disabled={alreadySubscribed}>
          {alreadySubscribed ? (
            <>
              <FaCheck color="green" size={20} className="mr-4" />
              Already Paid
            </>
          ) : (
            "Choose Now"
          )}
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
        title="check it out"
        subtitle="Our Amazing Tourist Package Plans"
      >
        <LoadingSection arrLen={3} />
        <form className="flex flex-wrap gap-6 justify-center">
          {plans.map((plan: Plan) => (
            <PlanCard plan={plan} key={plan.title} />
          ))}
          {/* <PlanCard plan={premiumPlan} />
          <PlanCard plan={additionalPlan} /> */}
        </form>
      </Section>
    </div>
  );
}
