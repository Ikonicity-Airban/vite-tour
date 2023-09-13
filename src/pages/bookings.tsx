import { Booking, IUser } from "../api/@types";
import { Button, Card, Label, TextInput } from "flowbite-react";
import { Form, useLocation, useNavigate } from "react-router-dom";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useMemo, useState } from "react";

import BookingTable from "../components/BookingTable";
import { LogoComponent } from "../components";
import PremiumCardList from "../components/PremiumCard";
import Section from "../components/Section";
import { db } from "../firebase";
import { defaultUser } from "../api/reducer";
import { scrollIntoView } from "../api/helper";
import { toast } from "react-hot-toast";
import { useForm } from "react-hook-form";
import useLocalStorage from "../api/useLocalStorage";

type booking = Omit<Booking, "id" | "userId" | "tourId">;

type IBookingForm = Omit<Booking, "id">;

function Bookings() {
  const [isLoading, setIsLoading] = useState(false);
  const {
    state: { location = "Enugu" },
  } = useLocation();
  const BookingForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<IBookingForm>();

    const [user] = useLocalStorage<IUser>("tour-user", defaultUser);

    const defaultDate = useMemo(() => {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      return nextWeek.toISOString().substring(0, 10);
    }, []);

    const onSubmit = async (book: booking) => {
      if (!user?.plan) {
        console.log(
          "🚀 ~ file: bookings.tsx:47 ~ onSubmit ~ !user?.plan:",
          user?.plan
        );
        toast.error("Please subscribe to a plan first");
        scrollIntoView("plans");
        return;
      }
      setIsLoading(true);
      try {
        const newBooking = await addDoc(collection(db, "bookings"), {
          ...book,
          userId: user.uid,
          plan: user?.plan,
          status: "idle",
          completed: false,
        });

        const userRef = doc(db, "users", user.uid || "");
        await updateDoc(userRef, { bookings: arrayUnion(newBooking) });
        toast.success("Successfully Booked a tour for " + location);
        navigate("/dashboard");
      } catch (e) {
        console.log("🚀 ~ file: bookings.tsx:59 ~ onSubmit ~ e:", e);
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="w-full flex items-center justify-center">
        <Card className="w-full max-w-md ">
          <span className="mx-auto">
            <LogoComponent />
          </span>
          <Form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <div className="mb-2 block">
              <Label htmlFor="location" className="capitalize">
                Location
              </Label>
              <TextInput
                readOnly
                step={1}
                defaultValue={location}
                required
                id="location"
                {...register("place")}
              />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="date" className="capitalize">
                Date
              </Label>
              <TextInput
                type="date"
                required
                id="date"
                defaultValue={defaultDate}
                {...register("date")}
              />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="numOfGuest" className="capitalize">
                Number of Guest
              </Label>
              <TextInput
                type="number"
                step={1}
                required
                defaultValue={3}
                id="numOfGuest"
                {...register("numGuests")}
              />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="duration" className="capitalize">
                Duration
              </Label>
              <TextInput
                type="number"
                defaultValue={3}
                required
                id="duration"
                {...register("duration")}
              />
            </div>
            <div className="mb-2 block">
              <Label htmlFor="plan" className="capitalize">
                Plan
              </Label>
              <TextInput
                disabled
                defaultValue={user?.plan || ""}
                required
                id="plan"
                {...register("plan")}
              />
            </div>
            <Button
              isProcessing={isLoading}
              type="submit"
              className="btn btn-primary"
            >
              Book
            </Button>
          </Form>
        </Card>
      </div>
    );
  };

  return (
    <>
      <Section subtitle="All Bookings">
        <BookingTable />
      </Section>
      <Section id="" subtitle="Book a tour" title="Almost there">
        <BookingForm />
      </Section>
      <PremiumCardList />
    </>
  );
}

export default Bookings;
