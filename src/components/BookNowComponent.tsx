import { Button, Card } from "flowbite-react";
import { SubmitHandler, useForm } from "react-hook-form";

import { FaMapLocation } from "react-icons/fa6";
import { IPlace } from "../api/@types";
import LogoComponent from "./LogoComponent";
import { defaultPlace } from "../api/contexts/reducer";
import useLocalStorage from "../api/hooks/useLocalStorage";
import { useNavigate } from "react-router-dom";

interface IProps {
  destination: string;
}
interface IForm {
  name: string;
  destination: string;
  email: string;
}
function BookNowComponent({ destination }: IProps) {
  const { register, handleSubmit } = useForm<IForm>();

  const [places] = useLocalStorage<IPlace[]>("tour-places", defaultPlace);
  const navigate = useNavigate();
  const onSubmit: SubmitHandler<IForm> = (data) => {
    const bookedPlace = places?.find((place) => place.name == data.destination);
    navigate("/bookings", {
      state: { location: bookedPlace?.name },
    });
  };

  return (
    <Card className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-3"
      >
        <div className="mx-auto mb-6">
          <LogoComponent />
        </div>
        <div className="w-full space-y-3 relative">
          <FaMapLocation className="absolute bottom-[25%] left-3 z-10" />
          <select
            required
            defaultValue={destination}
            className="w-full space-y-2 block outline-none p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
            {...register("destination")}
          >
            <option value={destination} className="text-gray-500" disabled>
              {destination || "Choose your Destination"}
            </option>
            {places?.map(({ name }, i) => (
              <option
                key={i}
                value={name}
                className="h-fit grid p-6 rounded cursor-pointer"
                // onClick={() => handleClick(name)}
              >
                {name}
              </option>
            ))}
          </select>
        </div>
        <div className="w-full mt-4">
          <Button
            className="w-full"
            gradientDuoTone="greenToBlue"
            type="submit"
          >
            Book a tour
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default BookNowComponent;
