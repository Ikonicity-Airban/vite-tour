import { Button, Card, Modal, Rating } from "flowbite-react";
import { FaCheck, FaClock, FaNairaSign, FaUsers } from "react-icons/fa6";
import { IPlan, IUser } from "../api/@types";
import { doc, updateDoc } from "firebase/firestore";

import LoadingSection from "./LoadingSection";
import Section from "./Section";
import { db } from "../firebase";
import { defaultUser } from "../api/contexts/reducer";
import toast from "react-hot-toast";
import { useFetchCollection } from "../api/hooks/fetchCollections";
import useLocalStorage from "../api/hooks/useLocalStorage";
import useModal from "../api/hooks/useModal";

export const PlanCard = ({ plan, user }: { plan: IPlan; user?: IUser }) => {
  const alreadySubscribed = Boolean(user?.plan == plan.title);
  const { title, description, image, price, rate, days, person, color } = plan;
  const { hideModal, isModalVisible, showModal } = useModal();

  const handleSubscription = async () => {
    if (!user?.email) {
      toast.error("You are not logged in, please login to continue");
      hideModal();
      return;
    }

    try {
      const userRef = doc(db, "users", user?.uid ?? "");
      await updateDoc(userRef, { plan: plan.title });
      toast.success(`Update complete - ${plan.title} plan subscribed`);
      location.reload();
    } catch (error) {
      toast.error("Failed to update");
    } finally {
      hideModal();
    }
  };
  return (
    <>
      <Modal show={isModalVisible} size="lg" popup onClose={hideModal}>
        <Modal.Header>
          <center>
            <h3 className="m-4 text-center w-full font-medium text-primary">
              Choose {title} plan
            </h3>
          </center>
        </Modal.Header>
        <hr />
        <Modal.Body>
          <>
            <center className="py-10">
              <div className="">Do you want to subscribe to {title} plan</div>
            </center>
            <div className="flex w-full justify-end space-x-6">
              <Button
                type="button"
                color="failure"
                onClick={handleSubscription}
                className="mt-2"
              >
                Ok
              </Button>

              <Button type="button" onClick={hideModal} className="mt-2">
                Cancel
              </Button>
            </div>
          </>
        </Modal.Body>
      </Modal>
      <Card
        className={
          "rounded-lg shadow-lg h-auto overflow-hidden text-center max-w-sm w-full"
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
          <Button
            outline={alreadySubscribed}
            pill
            disabled={alreadySubscribed}
            onClick={showModal}
          >
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
    </>
  );
};

export default function PremiumCardList() {
  const { data: plans } = useFetchCollection<IPlan>("plans");
  const [user] = useLocalStorage<IUser>("tour-user", defaultUser);
  return (
    <div className="w-full">
      <Section
        title="check it out"
        subtitle="Our Amazing Tourist Package Plans"
        id="plans"
      >
        <LoadingSection arrLen={3} />
        <form className="flex flex-wrap gap-6 justify-center">
          {plans.map((plan: IPlan) => (
            <PlanCard plan={plan} key={plan.title} user={user} />
          ))}
          {/* <PlanCard plan={premiumPlan} />
          <PlanCard plan={additionalPlan} /> */}
        </form>
      </Section>
    </div>
  );
}
