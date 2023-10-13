import { Button, Card, Modal } from "flowbite-react";
import {
  FaArrowsTurnRight,
  FaCheck,
  FaClock,
  FaNairaSign,
  FaUsers,
} from "react-icons/fa6";
import { IPlan, IUser } from "../api/@types";
import { doc, updateDoc } from "firebase/firestore";
import {
  useFetchCollection,
  useFetchSingleDoc,
} from "../api/hooks/fetchCollections";

import LoadingSection from "./LoadingSection";
import PaymentForm from "./CheckoutForm";
import { Rating } from "@mui/material";
import Section from "./Section";
import { db } from "../firebase";
import { defaultUser } from "../api/contexts/reducer";
import toast from "react-hot-toast";
import useLocalStorage from "../api/hooks/useLocalStorage";
import useModal from "../api/hooks/useModal";
import { useState } from "react";

export const PlanCard = ({ plan, user }: { plan: IPlan; user?: IUser }) => {
  const alreadySubscribed = Boolean(user?.plan == plan.title);

  const {
    title,
    description,
    image,
    price,
    rate,
    days,
    person,
    color,
    noOfTours,
  } = plan;
  const { hideModal, isModalVisible, showModal } = useModal();
  const [hasPaid, setHasPaid] = useState(false);

  const handleSubscription = async () => {
    if (!user?.email) {
      toast.error("You are not logged in, please login to continue");
      hideModal();
      return;
    }

    try {
      const userRef = doc(db, "users", user?.uid ?? "");
      await updateDoc(userRef, {
        plan: plan.title,
        noOfTourLeft: plan.noOfTours,
      });

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
      <Modal
        show={isModalVisible}
        className="py-6 space-y-10"
        size="2xl"
        popup
        onClose={hideModal}
      >
        <Modal.Header className="p-6 font-bold">
          Pay for the booking
        </Modal.Header>
        <hr />
        <Modal.Body className="p-4">
          <center>
            <h3 className="font-bold">{plan.price}</h3> (Naira)
          </center>
          <PaymentForm
            setHasPaid={setHasPaid}
            hasPaid={hasPaid}
            price={plan.price}
          />
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
            <li className="flex items-center gap-2 w-full text-sm mb-1">
              <center className="mx-auto">
                <Rating name="size-large" size="large" value={+rate} readOnly />
              </center>
            </li>
            <li className="flex items-center gap-2  text-sm mb-1">
              <FaClock />
              <span>Duration: {days} days</span>
            </li>
            <li className="flex gap-2 items-center  text-sm mb-1">
              <FaUsers /> <span>Number of Guest: {person}</span>
            </li>
            <li className="flex gap-2 items-center  text-sm mb-1">
              <FaArrowsTurnRight />{" "}
              <span>Number of Times to tour: {noOfTours}</span>
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
            onClick={() => (!hasPaid ? showModal() : handleSubscription())}
            style={{ backgroundColor: color }}
          >
            {alreadySubscribed ? (
              <>
                <FaCheck color="green" size={20} className="mr-4" />
                Already Paid
              </>
            ) : hasPaid ? (
              "Complete Payment"
            ) : (
              "Subscribe Now"
            )}
          </Button>
        </div>
      </Card>
    </>
  );
};

export default function PremiumCardList() {
  const { data: plans } = useFetchCollection<IPlan>("plans");
  const [storageUser] = useLocalStorage<IUser>("tour-user", defaultUser);
  const { data: user } = useFetchSingleDoc<IUser>(
    "users",
    storageUser?.uid || ""
  );
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
