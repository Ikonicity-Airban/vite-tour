import { Button, Card, Label, Modal, Table, TextInput } from "flowbite-react";
import React, { useEffect, useState } from "react";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";

import { Form } from "react-router-dom";
import { Plan } from "../../api/@types";
import Section from "../../components/Section";
import { db } from "../../firebase";
import { useFetchCollection } from "../../api/fetchCollections";
import { useForm } from "react-hook-form";

const defaultTourPlan: Plan = {
  id: "",
  title: "",
  description: "",
  image: "",
  price: 0,
  rate: "",
  days: 0,
  color: "",
  person: 0,
};

interface Props {
  tourPlan?: Plan;
  onSave: (tourPlan: Plan) => void;
  onCancel: () => void;
  show: () => void;
}

interface FormData extends Plan {
  time: Date;
}

const TourPlanForm = ({ tourPlan, onSave, onCancel }: Props) => {
  const { register, handleSubmit, setValue } = useForm<FormData>();

  const onSubmit = async (formData: FormData) => {
    const {
      title,
      description,
      color,
      days,
      image,
      person,
      price,
      rate,
      time,
    } = formData;
    const newTourPlan = {
      title,
      description,
      color,
      days,
      image,
      person,
      price,
      rate,
      time,
    };

    if (tourPlan) {
      const tourPlanRef = doc(db, "tourPlans", tourPlan.id);
      await updateDoc(tourPlanRef, newTourPlan);
      onSave({ ...tourPlan, ...newTourPlan });
    } else {
      await addDoc(collection(db, "tourPlans"), newTourPlan);
      onSave({ ...newTourPlan, id: "" });
    }
  };

  const onCancelClick = () => {
    onCancel();
  };

  React.useEffect(() => {
    if (tourPlan) {
      setValue("title", tourPlan.title);
      setValue("description", tourPlan.description);
    }
  }, [tourPlan]);

  return (
    <Card>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <Label htmlFor="title">Name</Label>
          <TextInput
            type="text"
            id="title"
            {...register("title", { required: true })}
          />
        </div>
        <div>
          <Label htmlFor="description">Description</Label>
          <TextInput
            type="text"
            id="description"
            {...register("description", { required: true })}
          />
        </div>
        <div>
          <Button type="submit">Save</Button>
          <Button type="Button" onClick={onCancelClick}>
            Cancel
          </Button>
        </div>
      </Form>
    </Card>
  );
};

const TourPlanList = () => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const plans = useFetchCollection<Plan>("plans");
  const [tourPlans, setTourPlans] = useState(plans);

  useEffect(() => {
    const fetchTourPlans = async () => {
      const tourPlansRef = collection(db, "plans");
      const snapshot = await getDocs(tourPlansRef);
      const data = snapshot.docs.map(
        (doc) => ({ id: doc.id, ...doc.data() } as Plan)
      );
      setTourPlans(data);
    };

    fetchTourPlans();
  }, []);

  const handleAddTourPlan = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const tourPlansRef = collection(db, "tourPlans");
    await addDoc(tourPlansRef, { name, description });
    const snapshot = await getDocs(tourPlansRef);
    const data = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Plan)
    );
    setTourPlans(data);
    setName("");
    setDescription("");
  };

  const handleEditTourPlan = async (
    id: string,
    name: string,
    description: string
  ) => {
    const tourPlanRef = doc(db, "tourPlans", id);
    await updateDoc(tourPlanRef, { name, description });
    const tourPlansRef = collection(db, "tourPlans");
    const snapshot = await getDocs(tourPlansRef);
    const data = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Plan)
    );
    setTourPlans(data);
  };

  const handleDeleteTourPlan = async (id: string) => {
    const tourPlanRef = doc(db, "tourPlans", id);
    await deleteDoc(tourPlanRef);
    const tourPlansRef = collection(db, "tourPlans");
    const snapshot = await getDocs(tourPlansRef);
    const data = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Plan)
    );
    setTourPlans(data);
  };

  return (
    <div>
      <div>
        <Table className="">
          <Table.Head>
            {Object.keys(defaultTourPlan)
              .filter((key) => !(key == "id" || key == "image"))
              .map((key) => (
                <Table.HeadCell colSpan={key == "description" ? 2 : 1}>
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
                <Table.Cell>{tourPlan.price}</Table.Cell>
                <Table.Cell>{tourPlan.person}</Table.Cell>
                <Table.Cell>{tourPlan.color}</Table.Cell>
                <Table.Cell>{tourPlan.rate}</Table.Cell>
                <Table.Cell>{tourPlan.person}</Table.Cell>
                <Table.Cell>{tourPlan.days}</Table.Cell>
                <Table.Cell>
                  <Button
                    onClick={() =>
                      handleEditTourPlan(
                        tourPlan?.id,
                        tourPlan.title,
                        tourPlan.description
                      )
                    }
                  >
                    Edit
                  </Button>
                </Table.Cell>
                <Table.Cell>
                  <button onClick={() => handleDeleteTourPlan(tourPlan.id)}>
                    Delete
                  </button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      </div>
    </div>
  );
};

export default function AdminDashdboard() {
  const [openModal, setOpenModal] = useState<string | undefined>();

  const props = { openModal, setOpenModal };

  return (
    <Section title="Tours Plans" subtitle="">
      <TourPlanList />
      <Button onClick={() => props.setOpenModal("form-elements")}>
        Toggle modal
      </Button>

      <Modal
        show={props.openModal === "form-elements"}
        size="md"
        popup
        onClose={() => props.setOpenModal(undefined)}
      >
        {/* <TourPlanForm /> */}
      </Modal>
    </Section>
  );
}
