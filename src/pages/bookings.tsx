import { Button, Card, Label, TextInput } from "flowbite-react";
import { Form, useNavigate } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";

import { AppContext } from "../api/context";
import { Booking } from "../api/@types";
import PremiumCardList from "../components/PremiumCard";
import Section from "../components/Section";
import { db } from "../firebase";
import { useContext } from "react";
import { useForm } from "react-hook-form";

type booking = Omit<Booking, "id" | "userId" | "tourId">;

const defaultBooking: booking = {
  place: "Enugu",
  date: new Date(Date.now()),
  duration: "",
  numGuests: 3,
  plan: null,
};

type IBookingForm = Omit<Booking, "id">;

const bookingEntries = Object.keys(defaultBooking);

function Bookings() {
  // const {
  //   state: { places, user },
  // } = useContext(AppContext);
  // const { state } = useLocation();

  const TourForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<IBookingForm>();

    const {
      state: { user },
    } = useContext(AppContext);

    const onSubmit = async (book: booking) => {
      try {
        const docRef = await addDoc(collection(db, "bookings"), {
          ...book,
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
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            
            {bookingEntries.map((key) => {
              return (
                <div className="mb-2 block" key={key}>
                  <Label htmlFor={key}>{key}</Label>
                  <TextInput
                    type={key === "date" ? "date" : "text"}
                    required
                    id={key}
                    // style={{ width: "100%" }}
                    {...register(key as keyof booking, {
                      valueAsDate: key === "date",
                    })}
                  />
                </div>
              );
            })}
            <Button type="submit" className="btn btn-primary">
              Save tour
            </Button>
          </Form>
        </Card>
      </div>
    );
  };

  return (
    <>
      <PremiumCardList />
      <Section id="" subtitle="Book a tour" title="Almost there">
        <TourForm />
      </Section>
    </>
  );
}

export default Bookings;
