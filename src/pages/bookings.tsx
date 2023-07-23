import { Button, Card, Label, TextInput } from "flowbite-react";
import { Form, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

import { AppContext } from "../api/context";
import PremiumCardList from "../components/PremiumCard";
import Section from "../components/Section";
import { Tour } from "../api/@types";
import { db } from "../firebase";
import { useContext } from "react";
import { useForm } from "react-hook-form";

function Bookings() {
  // const {
  //   state: { places, user },
  // } = useContext(AppContext);
  // const { state } = useLocation();

  return (
    <>
      <PremiumCardList />
      <Section
        id="tours-packages"
        title="Tours packages"
        subtitle="Premium Packages"
      >
        <TourForm />
      </Section>
    </>
  );
}

const defaultTour = {
  description: "",
  price: 0,
  rate: "",
  days: 0,
  color: "",
  person: 0,
};

const TourForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit } = useForm<Tour>();

  const tourEntries = Object.entries(defaultTour);
  const {
    state: { user },
  } = useContext(AppContext);

  const onSubmit = async (tour: Tour) => {
    try {
      const docRef = await addDoc(collection(db, "bookings"), {
        ...tour,
        userId: user.uid,
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
    navigate("/dashboard");
  };

  return (
    <div className="w-full flex items-center justify-center">
      <Card className="w-full max-w-md ">
        <Form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
          {tourEntries
            .filter((item) => item[0] !== "userId")
            .map(([key, value]) => (
              <div className="mb-2 block" key={key}>
                <Label htmlFor={key}>{key}</Label>
                <TextInput
                  required
                  id={key}
                  defaultValue={value}
                  // style={{ width: "100%" }}
                  {...register(key as keyof Tour, {
                    valueAsNumber: key == "price" || key == "duration",
                  })}
                />
              </div>
            ))}
          <Button type="submit" className="btn btn-primary">
            Save tour
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default Bookings;
