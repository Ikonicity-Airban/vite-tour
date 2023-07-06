import { Button, Card, Dropdown, Label, TextInput } from "flowbite-react";
import LogoComponent from "./LogoComponent";
import { SubmitHandler, useForm } from "react-hook-form";
import { useContext } from "react";
import { AppContext } from "../api/context";
import { DebounceInput } from "react-debounce-input";

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

  function handleClick(params: type) {}
  return (
    <Card className="w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-3"
      >
        <div className="mx-auto mb-6">
          <LogoComponent />
        </div>
        <div className="w-full">
          <Dropdown
            className="min-w-full"
            outline
            inline
            label={
              <Label className="" htmlFor="name">
                Destination
              </Label>
            }
          >
            <DebounceInput type="text" {...register("destination")} />
            {places && (
              <ul className="w-full space-y-2">
                {places?.map(({ name, tags }, i) => (
                  <li
                    key={i}
                    className="h-fit bg-[whitesmoke] p-2 rounded cursor-pointer"
                    onClick={() => handleClick(name)}
                  >
                    <span className="bg-gray-100 text-[11px]">{tags}</span>
                  </li>
                ))}
              </ul>
            )}
          </Dropdown>
        </div>
        <div className="w-full mt-4">
          <Button className="w-full" type="submit">
            Book
          </Button>
        </div>
      </form>
    </Card>
  );
}

export default BookNowComponent;
