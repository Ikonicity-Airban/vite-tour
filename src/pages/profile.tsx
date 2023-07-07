import React from "react";
import { AppContext } from "../api/context";
import Section from "../components/Section";
import { Avatar, Label, TextInput } from "flowbite-react";

function ProfilePage() {
  const {
    state: { user: userDetails },
  } = React.useContext(AppContext);
  return (
    <div className="">
      <Section subtitle="My Profile">
        <div className="mx-auto max-w-xl w-full min-w-[280px] space-y-3">
          <Avatar size="xl" rounded className="relative">
            <i className="fa fa-camera absolute left-[55%] bottom-0"></i>
          </Avatar>
          {userDetails &&
            Object.entries(userDetails).map((arr) => {
              return (
                <div className="block">
                  <Label htmlFor={arr[0]}>{arr[0]}</Label>
                  <TextInput id={arr[0]} value={arr[1].toString()} />
                </div>
              );
            })}
          {Array(4)
            .fill(null)
            .map((item, i) => (
              <div className="block">
                <Label htmlFor={i + ""}>{i}</Label>
                <TextInput readOnly value={item} />
              </div>
            ))}
        </div>
      </Section>
    </div>
  );
}

export default ProfilePage;
