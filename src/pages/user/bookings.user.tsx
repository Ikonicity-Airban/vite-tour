import {
  BookingTable,
  LogoComponent,
  PremiumCardList,
  Section,
} from "../../components";
import { Button, Card, Label, Select, TextInput } from "flowbite-react";
import { IBooking, IPlace, IUser } from "../../api/@types";
import {
  addDoc,
  arrayUnion,
  collection,
  doc,
  updateDoc,
} from "firebase/firestore";
import { defaultPlace, defaultUser } from "../../api/contexts/reducer";
import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState } from "react";

import { db } from "../../firebase";
import { scrollIntoView } from "../../api/helper";
import { toast } from "react-hot-toast";
import { useFetchSingleDoc } from "../../api/hooks/fetchCollections";
import { useForm } from "react-hook-form";
import useLocalStorage from "../../api/hooks/useLocalStorage";

type booking = Omit<IBooking, "id" | "userId" | "tourId">;

type IBookingForm = Omit<IBooking, "id">;

function Bookings() {
  const [isLoading, setIsLoading] = useState(false);

  let location = "Enugu";
  location = useLocation().state?.location;

  const BookingForm = () => {
    const navigate = useNavigate();
    const { register, handleSubmit } = useForm<IBookingForm>();
    const [places] = useLocalStorage<IPlace[]>("tour-places", defaultPlace);

    const [storageUser] = useLocalStorage<IUser>("tour-user", defaultUser);
    const { data: user, refetch } = useFetchSingleDoc<IUser>(
      "users",
      storageUser.uid || ""
    );

    const defaultDate = useMemo(() => {
      const nextWeek = new Date();
      nextWeek.setDate(nextWeek.getDate() + 7);
      return nextWeek.toISOString().substring(0, 10);
    }, []);

    const onSubmit = async (book: booking) => {
      if (!user?.plan) {
        toast.error("Please subscribe to a plan first");
        scrollIntoView("plans");
        return;
      }
      setIsLoading(true);
      try {
        const newBooking = await addDoc(collection(db, "bookings"), {
          ...book,
          userId: user.uid,
          email: user.email,
          plan: user?.plan,
          status: "idle",
          completed: false,
        });

        const userRef = doc(db, "users", user.uid || "");
        await updateDoc(userRef, { bookings: arrayUnion(newBooking) });
        toast.success("Successfully Booked a tour for " + location);
        refetch();
        navigate("/dashboard");
      } catch (e) {
        toast.error("Something went wrong");
      } finally {
        setIsLoading(false);
      }
    };

    return (
      <div className="w-full flex items-center justify-center">
        <Card className="w-full max-w-md">
          <span className="mx-auto py-10">
            <LogoComponent />
          </span>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <Select required defaultValue={location} {...register("place")}>
              <option
                value={location}
                className="text-gray-500"
                disabled={!location}
              >
                {location || "Choose your Destination"}
              </option>
              {places
                ?.filter((place) => place.name !== location)
                .map(({ name }: IPlace, i: number) => (
                  <option
                    key={i}
                    value={name}
                    className="h-fit grid rounded cursor-pointer"
                    // onClick={() => handleClick(name)}
                  >
                    {name}
                  </option>
                ))}
            </Select>
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
              pill
              gradientDuoTone="greenToBlue"
              isProcessing={isLoading}
              type="submit"
              className="btn btn-primary"
            >
              Book
            </Button>
          </form>
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
