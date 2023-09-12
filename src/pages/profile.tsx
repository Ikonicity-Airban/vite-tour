import { Avatar, Checkbox, Label, TextInput } from "flowbite-react";
import { IUser, Plan } from "../api/@types";
import {
  useFetchCollection,
  useQueryCollection,
} from "../api/fetchCollections";

import { PlanCard } from "../components/PremiumCard";
import Section from "../components/Section";
import { defaultUser } from "../api/reducer";
import useLocalStorage from "../api/useLocalStorage";

function ProfilePage() {
  const [user] = useLocalStorage<IUser>("tour-user", defaultUser);
  console.log("🚀 ~ file: profile.tsx:15 ~ ProfilePage ~ user:", user);

  const ProfileForm = () => (
    <div className="mx-auto max-w-xl w-full min-w-[280px] space-y-3">
      <Avatar
        size="xl"
        rounded
        className="relative"
        img={user?.photoURL || ""}
        placeholderInitials={user?.photoURL || user?.email?.slice(0, 2)}
      >
        <i className="fa fa-camera absolute left-[55%] bottom-0"></i>
      </Avatar>
      {user && (
        <>
          <div className="block">
            <Label htmlFor={user.displayName || ""}>Name</Label>
            <TextInput
              readOnly
              id={user?.displayName || ""}
              value={user?.displayName || ""}
            />
          </div>
          <div className="block">
            <Label htmlFor={user?.email || ""}>Email</Label>
            <TextInput
              readOnly
              id={user?.email || ""}
              value={user?.email || ""}
            />
          </div>
          <div className="block">
            <Label htmlFor="phone">Phone</Label>
            <TextInput
              readOnly
              type="phone"
              id="phone"
              defaultValue={user?.phone || ""}
            />
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              disabled
              defaultChecked={user?.emailVerified || false}
              id="emailVerified"
            />
            <Label htmlFor="emailVerified">Verified Email</Label>
          </div>
        </>
      )}
    </div>
  );

  const plans = useFetchCollection<Plan>("plans");
  const userPlan = plans.filter((plan: Plan) => plan.title === user?.plan);
  return (
    <div className="">
      <Section subtitle="My Profile">
        <ProfileForm />
      </Section>
      <Section title="Current Plan">
        {user?.plan ? (
          <PlanCard plan={userPlan} />
        ) : (
          <center>You don't have a plan</center>
        )}
      </Section>
    </div>
  );
}

export default ProfilePage;
