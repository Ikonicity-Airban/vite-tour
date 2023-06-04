import { Button, Card, Label, TextInput } from "flowbite-react";
import React from "react";
import LogoComponent from "./LogoComponent";

interface IBNCProps {
  formData: {
    name: string;
    type: string;
    title: string;
    icon: string;
  }[];
}
function BookNowComponent({ formData }: IBNCProps) {
  React.useEffect(() => {
    console.log("TWICE");
  }, []);
  return (
    <Card className="w-full">
      <form className="w-full flex flex-col gap-3">
        <div className="mx-auto mb-6">
          <LogoComponent />
        </div>
        {formData.map(({ name, title, type }, idx) => (
          <div className="w-full" key={idx}>
            <Label className="" htmlFor={name}>
              {title}
            </Label>
            <TextInput type={type} />
          </div>
        ))}
        <div className="w-full mt-4">
          <Button className="w-full">Book</Button>
        </div>
      </form>
    </Card>
  );
}

export default BookNowComponent;
