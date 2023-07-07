import { Button, Card } from "flowbite-react";
import LogoComponent from "./LogoComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext } from "react";
import { AppContext } from "../api/context";

interface IForm {
  name: string;
  destination: string;
  email: string;
}
function BookNowComponent() {
  const {
    state: { places },
  } = useContext(AppContext);
  const { register, handleSubmit } = useForm<IForm>();

  const onSubmit: SubmitHandler<IForm> = (data) => {
    console.log(
      "🚀 ~ file: BookNowComponent.tsx:18 ~ BookNowComponent ~ data:",
      data
    );
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
          <i className="fa fa-location absolute bottom-[25%] left-3 z-10"></i>
          {places && (
            <select
              required
              defaultValue="Choose your Destination"
              className="w-full space-y-2 block  p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("destination")}
            >
              <option value="">Choose your Destination</option>
              {places?.map(({ name }, i) => (
                <option
                  key={i}
                  value={name}
                  className="h-fit grid p-2 rounded cursor-pointer bg-gray-200 hover:bg-gray-300"
                  // onClick={() => handleClick(name)}
                >
                  {name}
                </option>
              ))}
            </select>
          )}
        </div>
        <div className="w-full mt-4">
          <Button
            className="w-full"
            gradientDuoTone="greenToBlue"
            type="submit"
          >
            Book
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default BookNowComponent;
