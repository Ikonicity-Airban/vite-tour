import { Avatar, Checkbox, Label, TextInput } from "flowbite-react";

import { AppContext } from "../api/context";
import { IUser } from "../api/@types";
import { PlanCard } from "../components/PremiumCard";
import React from "react";
import Section from "../components/Section";
import { useQueryCollection } from "../api/fetchCollections";

function ProfilePage() {
  const {
    state: { user: userDetails },
  } = React.useContext(AppContext);

  const userInfo = useQueryCollection<IUser>(
    "users",
    "userId",
    userDetails.email
  ) as IUser;

  const ProfileForm = () => (
    <div className="mx-auto max-w-xl w-full min-w-[280px] space-y-3">
      <Avatar
        size="xl"
        rounded
        className="relative"
        img={userDetails.photoURL}
        placeholderInitials={
          userDetails.photoURL || userDetails.email.slice(0, 2)
        }
      >
        <i className="fa fa-camera absolute left-[55%] bottom-0"></i>
      </Avatar>
      {userDetails && (
        <>
          <div className="block">
            <Label htmlFor={userDetails.displayName}>Name</Label>
            <TextInput
              readOnly
              id={userDetails.displayName}
              value={userDetails.displayName}
            />
          </div>
          <div className="block">
            <Label htmlFor={userDetails.email}>Email</Label>
            <TextInput
              readOnly
              id={userDetails.email}
              value={userDetails.email}
            />
          </div>
          <div className="block">
            <Label htmlFor={userDetails.phoneNumber}>Phone</Label>
            <TextInput
              readOnly
              type="phone"
              id={userDetails.phoneNumber}
              defaultValue={userDetails.phoneNumber}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox disabled defaultValue={userDetails.emailVerified} />
            <Label htmlFor={userDetails.emailVerified}>Verified Email</Label>
          </div>
        </>
      )}
    </div>
  );

  // const userPlan = useQueryCollection("booking", "userId", userDetails.email);
  return (
    <div className="">
      <Section subtitle="My Profile">
        <ProfileForm />
      </Section>
      <Section title="Current Plan">
        {userInfo.plan ? <PlanCard plan={userInfo?.plan} /> : null}
      </Section>
    </div>
  );
}

export default ProfilePage;
