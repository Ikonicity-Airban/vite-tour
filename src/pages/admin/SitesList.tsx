import { Button, Label, Modal, Table, TextInput } from "flowbite-react";
import { FaPen, FaPlus, FaTrashCan } from "react-icons/fa6";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { IPlace } from "../../api/@types";
import React from "react";
import { db } from "../../firebase";
import { useFetchCollection } from "../../api/fetchCollections";
import { useForm } from "react-hook-form";
import useModal from "../../api/useModal";

const defaultTourPlan: IPlace = {
  id: "",
  name: "",
  about: "",
  tags: "",
  other: [],
  images: [""],
};

interface Props {
  tourSite?: IPlace;
  onSave: (tourSite: IPlace) => void;
}

interface FormData extends IPlace {
  time: Date;
}

export const TourPlanList = () => {
  const [mode, setMode] = useState<"Create" | "Edit" | "Delete">("Create");
  const plans = useFetchCollection<IPlace>("plans");
  const [tourPlans, setTour] = useState(plans);
  const { hideModal, isModalVisible, showModal } = useModal();
  const [selectedPlan, setSelectedPlan] = useState<IPlace>(defaultTourPlan);

  useEffect(() => {
    const fetchTourPlans = async () => {
      const tourPlansRef = collection(db, "plans");
      const snapshot = await getDocs(tourPlansRef);
      const data = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as IPlace)
      );
      setTour(data);
    };

    fetchTourPlans();
  }, []);

  const handleCreateTour = () => {
    setSelectedPlan(defaultTourPlan);
    setMode("Create");
    showModal();
  };
  const handleEditTourPlan = async (tourSite: IPlace) => {
    setSelectedPlan(tourSite);
    setMode("Edit");
    showModal();
  };

  const handleDeleteTourPlan = async (id: string) => {
    const tourPlanRef = doc(db, "tourPlans", id);
    await deleteDoc(tourPlanRef);
    const tourPlansRef = collection(db, "tourPlans");
    const snapshot = await getDocs(tourPlansRef);
    const data = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as IPlace)
    );
    setTour(data);
    hideModal();
  };
  const TourPlanForm = ({ tourSite = selectedPlan }: Props) => {
    const { register, handleSubmit, setValue, reset } = useForm<FormData>();

    React.useEffect(() => {
      reset(selectedPlan);
    }, [tourSite, setValue, reset]);

    const onSubmit = async (formData: FormData) => {
      const tourPlanRef = doc(db, "tourPlans", formData.id);
      await updateDoc(tourPlanRef, { ...tourSite });
      const tourPlansRef = collection(db, "tourPlans");
      const snapshot = await getDocs(tourPlansRef);
      const data = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as IPlace)
      );
      setTour(data);
      reset();
    };

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="title">Name</Label>
            <TextInput
              type="text"
              id="title"
              {...register("name", { required: true })}
            />
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <TextInput
              type="text"
              id="description"
              {...register("about", { required: true })}
            />
          </div>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </>
    );
  };

  return (
    <div>
      <Modal show={isModalVisible} size="lg" popup onClose={hideModal}>
        <Modal.Header>
          <center>
            <h3 className="m-4 text-center w-full font-medium text-primary">
              {mode} IPlace
            </h3>
          </center>
        </Modal.Header>
        <hr />
        <Modal.Body>
          {mode == "Delete" ? (
            <>
              <center className="py-4">
                <div className="">Do you want to delete this tour?</div>
              </center>
              <div className="flex w-full justify-end space-x-6">
                <Button
                  type="button"
                  color="failure"
                  onClick={() => handleDeleteTourPlan(selectedPlan?.id)}
                  className="mt-2"
                >
                  Ok
                </Button>

                <Button type="button" onClick={hideModal} className="mt-2">
                  Cancel
                </Button>
              </div>
            </>
          ) : (
            <>
              <TourPlanForm onSave={setTour} tourSite={selectedPlan} />
              <Button type="button" onClick={hideModal} className="w-full mt-2">
                Cancel
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
      <div>
        <Button
          type="button"
          onClick={handleCreateTour}
          className="w-full mt-2"
        >
          <FaPlus /> Add a New IPlace
        </Button>
        <Table className="">
          <Table.Head>
            {Object.keys(defaultTourPlan)
              .filter((key) => !(key == "id"))
              .map((key) => (
                <Table.HeadCell
                  colSpan={key == "description" || key == "action" ? 2 : 1}
                >
                  {key}
                </Table.HeadCell>
              ))}
            <Table.HeadCell colSpan={2}>Action</Table.HeadCell>
          </Table.Head>
          <Table.Body>
            {tourPlans?.map((tourSite: IPlace) => (
              <Table.Row key={tourSite.id}>
                <Table.Cell>{tourSite.name}</Table.Cell>
                <Table.Cell colSpan={2}>{tourSite.about}</Table.Cell>
                <Table.Cell className="flex space-x-3">
                  {tourSite.images.map((src) => (
                    <img src={src} alt={src} />
                  ))}
                </Table.Cell>
                <Table.Cell>{tourSite.tags}</Table.Cell>

                <Table.Cell>
                  <div
                    className="ring-1 p-2 rounded-lg"
                    onClick={() => handleEditTourPlan(tourSite)}
                  >
                    <FaPen />
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div
                    className="ring-1 p-2 rounded-lg"
                    onClick={() => {
                      setSelectedPlan(tourSite);
                      setMode("Delete");
                      showModal();
                    }}
                  >
                    <FaTrashCan />
                  </div>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};
