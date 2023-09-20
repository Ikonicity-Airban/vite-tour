import {
  Avatar,
  Button,
  Checkbox,
  Label,
  Modal,
  Spinner,
  TextInput,
  Tooltip,
} from "flowbite-react";
import { IPlan, IUser } from "../api/@types";
import { ImageUploader, PlanCard, Section } from "../components";
import { SubmitHandler, useForm } from "react-hook-form";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import {
  useFetchCollection,
  useFetchSingleDoc,
} from "../api/hooks/fetchCollections";

import { FaCamera } from "react-icons/fa6";
import { db } from "../firebase";
import { defaultUser } from "../api/contexts/reducer";
import toast from "react-hot-toast";
import useLocalStorage from "../api/hooks/useLocalStorage";
import useModal from "../api/hooks/useModal";

function ProfilePage() {
  const [storageUser] = useLocalStorage<IUser>("tour-user", defaultUser);
  const [imageData, setImageData] = useState<string | null>(null);

  const { data: user } = useFetchSingleDoc<IUser>(
    "users",
    storageUser?.uid || ""
  );

  const [userPlan, setUserPlan] = useState<IPlan>();
  const { data: plans, refetch, fetching } = useFetchCollection<IPlan>("plans");
  const [loading, setLoading] = useState(false);
  const [isUploading, setIsUploading] = useState(false);

  const { showModal, hideModal, isModalVisible } = useModal();
  const { handleSubmit, register } = useForm<IUser>();

  const onSubmit: SubmitHandler<IUser> = async (formData) => {
    setLoading(true);
    const updatedUser = {
      ...user,
      ...formData,
    };
    console.log(
      "🚀 ~ file: profile.tsx:46 ~ constonSubmit:SubmitHandler<IUser>= ~ updatedUser:",
      updatedUser
    );

    // try {
    //   await updateDoc(doc(db, "users", storageUser.uid || ""), {
    //     ...formData,
    //   });
    //   toast.success("Updated photo successfully");
    //   refetch();
    // } catch (error) {
    //   console.log(
    //     "🚀 ~ file: profile.tsx:52 ~ constonSubmit:SubmitHandler<IUser>= ~ error:",
    //     error
    //   );
    // } finally {
    //   setLoading((prev) => !prev);
    // }
  };

  const handleUploadPhoto = async () => {
    try {
      setIsUploading(true);
      await updateDoc(doc(db, "users", storageUser.uid || ""), {
        photoURL: imageData,
      });
      toast.success("Updated profile successfully");
      setImageData(null);
      refetch();
    } catch (error) {
      console.log(
        "🚀 ~ file: profile.tsx:67 ~ handleUploadPhoto ~ error:",
        error
      );
    }
    setIsUploading(false);
    hideModal();
  };

  const ProfileForm = () => (
    <div className="mx-auto max-w-xl w-full min-w-[280px] space-y-3">
      <Modal show={isModalVisible} size="lg" popup onClose={hideModal}>
        <Modal.Header className="p-6 text-center">
          Upload a profile photo
        </Modal.Header>
        <hr />
        <Modal.Body className="mt-6">
          <ImageUploader imageData={imageData} setImageData={setImageData} />
        </Modal.Body>
        <Modal.Footer>
          <Button
            pill
            disabled={!imageData || isUploading}
            gradientDuoTone="greenToBlue"
            isProcessing={isUploading}
            className="w-full"
            onClick={handleUploadPhoto}
          >
            Upload Photo
          </Button>
        </Modal.Footer>
      </Modal>

      <>
        <Avatar
          size="xl"
          rounded
          className="relative mx-auto"
          img={user?.photoURL}
          onClick={showModal}
          placeholderInitials={user?.photoURL || user?.email?.slice(0, 2)}
        >
          <Tooltip
            content="click to edit photo"
            trigger="hover"
            className="cursor-pointer mx-auto"
          >
            <div className="hover:scale-150 absolute left-[55%] bottom-0">
              <FaCamera />
            </div>
          </Tooltip>
        </Avatar>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="block">
            <Label htmlFor="displayName">Full Name</Label>
            <TextInput
              id="displayName"
              placeholder={user.displayName}
              defaultValue={user.displayName}
              {...register("displayName")}
            />
          </div>
          <div className="block">
            <Label htmlFor="email">Email</Label>
            <TextInput readOnly disabled id="email" value={user.email} />
          </div>
          <div className="block">
            <Label htmlFor="phone">Phone Number</Label>
            <TextInput
              type="phone"
              id="phone"
              placeholder={user.phoneNumber}
              defaultValue={user.phoneNumber}
              {...register("phoneNumber")}
            />
          </div>
          <div className="flex items-center space-x-2 my-10">
            <Checkbox
              disabled
              defaultChecked={user.emailVerified}
              id="emailVerified"
            />
            <Label htmlFor="emailVerified">Verified Email</Label>
          </div>
          <div className="my-4">
            <Button
              type="submit"
              pill
              gradientDuoTone="greenToBlue"
              className="w-full"
              isProcessing={loading}
            >
              Update Profile
            </Button>
          </div>
        </form>
      </>
    </div>
  );

  useEffect(() => {
    setUserPlan(plans.find((plan: IPlan) => plan?.title === user?.plan));
  }, [user, plans]);

  return (
    <div className="">
      <Section subtitle="My Profile">
        <ProfileForm />
      </Section>
      <Section title="Current Plan">
        <center>
          {userPlan ? (
            <PlanCard plan={userPlan} user={user} />
          ) : fetching ? (
            <center>
              <Spinner />
            </center>
          ) : (
            <center>You don't have a plan</center>
          )}
        </center>
      </Section>
    </div>
  );
}

export default ProfilePage;
