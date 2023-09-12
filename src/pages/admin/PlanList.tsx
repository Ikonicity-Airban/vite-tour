import {
  Button,
  Label,
  Modal,
  Table,
  TextInput,
  Textarea,
} from "flowbite-react";
import { FaPen, FaPlus, FaTrashCan } from "react-icons/fa6";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import { useEffect, useState } from "react";

import { Plan } from "../../api/@types";
import React from "react";
import { db } from "../../firebase";
import { v4 as randomUUID } from "uuid";
import { useFetchCollection } from "../../api/fetchCollections";
import { useForm } from "react-hook-form";
import useModal from "../../api/useModal";

const defaultTourPlan: Plan = {
  id: "",
  title: "",
  description: "",
  image: "",
  price: 0,
  color: "",
  rate: "",
  person: 0,
  days: 0,
};

interface Props {
  tourPlan?: Plan;
  onSave: (tourPlan: Plan) => void;
}

interface FormData extends Plan {
  time: Date;
}

export const TourPlanList = () => {
  const [mode, setMode] = useState<"Create" | "Edit" | "Delete">("Create");
  const plans = useFetchCollection<Plan>("plans");
  const [tourPlans, setTourPlans] = useState(plans);
  const { hideModal, isModalVisible, showModal } = useModal();
  const [selectedPlan, setSelectedPlan] = useState<Plan>(defaultTourPlan);

  const fetchTourPlans = async () => {
    const tourPlansRef = collection(db, "plans");
    const snapshot = await getDocs(tourPlansRef);
    const data = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Plan)
    );
    setTourPlans(data);
  };
  useEffect(() => {
    fetchTourPlans();
  }, []);

  const handleCreateTour = () => {
    setSelectedPlan(defaultTourPlan);
    setMode("Create");
    showModal();
  };
  const handleEditTourPlan = async (tourPlan: Plan) => {
    setSelectedPlan(tourPlan);
    setMode("Edit");
    showModal();
  };

  const handleDeleteTourPlan = async (docId: string) => {
    try {
      const collectionRef = collection(db, "plans");
      const documentRef = doc(collectionRef, docId);
      await deleteDoc(documentRef);
      console.log("Document deleted successfully");
    } catch (error) {
      console.error("Error deleting document:", error);
    }

    const tourPlansRef = collection(db, "plans");
    const snapshot = await getDocs(tourPlansRef);
    const data = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Plan)
    );
    hideModal();
    setTourPlans(data);
  };
  const TourPlanForm = ({ tourPlan = selectedPlan }: Props) => {
    const { register, handleSubmit, setValue, reset } = useForm<FormData>();

    React.useEffect(() => {
      reset(selectedPlan);
      if (tourPlan) {
        setValue("title", tourPlan.title);
        setValue("description", tourPlan.description);
      }
    }, [tourPlan, setValue, reset]);

    const onSubmit = async (formData: FormData) => {
      if (mode == "Create") {
        const tourPlansRef = collection(db, "plans");
        await addDoc(tourPlansRef, { ...formData, id: randomUUID() });
        fetchTourPlans();
        reset(defaultTourPlan);
        hideModal();
      } else {
        const tourPlanRef = doc(db, "plans", formData.id);
        await updateDoc(tourPlanRef, { ...tourPlan });
        fetchTourPlans();
        reset(defaultTourPlan);
      }
    };

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {Object.keys(defaultTourPlan)
            .filter(
              (key) => !["id", "color", "image", "description"].includes(key)
            )
            .map((key) => (
              <div key={key}>
                <Label htmlFor={key}>{key}</Label>
                <TextInput
                  type={
                    ["person", "price", "rate", "day"].includes(key)
                      ? "number"
                      : "text"
                  }
                  min={0}
                  id={key}
                  {...register(key as keyof Plan, { required: true })}
                />
              </div>
            ))}
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              className="h-20"
              {...register("description", { required: true })}
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
              {mode} Tour
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
              <TourPlanForm onSave={setTourPlans} tourPlan={selectedPlan} />
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
          <FaPlus className="mr-4" /> Add a New Plan
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
            {tourPlans?.map((tourPlan: Plan) => (
              <Table.Row key={tourPlan.id}>
                <Table.Cell>{tourPlan.title}</Table.Cell>
                <Table.Cell colSpan={2}>{tourPlan.description}</Table.Cell>
                <Table.Cell
                  className="text-center"
                  style={{ color: tourPlan.color }}
                >
                  <i className={tourPlan.image}></i>
                </Table.Cell>
                <Table.Cell>{tourPlan.price}</Table.Cell>
                <Table.Cell>{tourPlan.color}</Table.Cell>
                <Table.Cell>{tourPlan.rate}</Table.Cell>
                <Table.Cell>{tourPlan.person}</Table.Cell>
                <Table.Cell>{tourPlan.days}</Table.Cell>
                <Table.Cell>
                  <div
                    className="ring-1 p-2 rounded-lg"
                    onClick={() => handleEditTourPlan(tourPlan)}
                  >
                    <FaPen />
                  </div>
                </Table.Cell>
                <Table.Cell>
                  <div
                    className="ring-1 p-2 rounded-lg"
                    onClick={() => {
                      setSelectedPlan(tourPlan);
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
