import {
  Button,
  Label,
  Modal,
  Select,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { FaPen, FaPlus, FaTrashCan } from "react-icons/fa6";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { useMemo, useState } from "react";

import { IPlan } from "../../api/@types";
import React from "react";
import { db } from "../../firebase";
import { v4 as randomUUID } from "uuid";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useModal from "../../api/hooks/useModal";
import { useFetchCollection } from "../../api/hooks/fetchCollections";

const defaultTourPlan: IPlan = {
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
const tourPlanKeys = {
  title: "Name of Plan",
  description: "A Short description of the tour",
  image: "A tour Icon",
  price: "Price",
  color: "Color",
  rate: "Rating",
  person: "Number of Guests",
  days: "Days of tour",
};

const colors = [
  "red",
  "yellow",
  "skyblue",
  "green",
  "teal",
  "magenta",
  "gray",
  "silver",
  "gold",
];

const images = {
  crown: "fa fa-crown",
  suitcase: "fa fa-suitcase",
  diamond: "fa fa-diamond",
  star: "fa fa-star",
  Hotel: "fa fa-hotel",
};

interface Props {
  tourPlan?: IPlan;
}

interface FormData extends IPlan {
  time: Date;
}

const TourPlanList = () => {
  const [mode, setMode] = useState<"Create" | "Edit" | "Delete">("Create");

  const {
    data: tourPlans,
    refetch,
    fetching,
  } = useFetchCollection<IPlan>("plans");

  const { hideModal, isModalVisible, showModal } = useModal();
  const [selectedPlan, setSelectedPlan] = useState<IPlan>(defaultTourPlan);

  const handleCreateTour = () => {
    setSelectedPlan(defaultTourPlan);
    setMode("Create");
    showModal();
  };
  const handleEditTourPlan = async (tourPlan: IPlan) => {
    setSelectedPlan(tourPlan);
    setMode("Edit");
    showModal();
  };

  const handleDeleteTourPlan = async (docId: string) => {
    try {
      const planRef = doc(db, "plans", docId);
      await deleteDoc(planRef);
      toast.success("Document deleted successfully");
      refetch();
    } catch (error) {
      console.error("Error deleting document:", error);
    }
    hideModal();
  };

  const TourPlanForm = ({ tourPlan = selectedPlan }: Props) => {
    const { register, handleSubmit, setValue, reset } = useForm<FormData>();

    React.useEffect(() => {
      reset(selectedPlan);
    }, [tourPlan, setValue, reset]);

    const onSubmit = async (formData: FormData) => {
      try {
        if (mode == "Create") {
          const id = randomUUID();
          const tourPlansRef = doc(db, "plans", id);
          await setDoc(tourPlansRef, { ...formData, id });
        } else {
          const tourPlanRef = doc(db, "plans", formData.id);
          await updateDoc(tourPlanRef, { ...formData });
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        reset(defaultTourPlan);
        hideModal();
      }
    };

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-2 py-4">
          {Object.keys(defaultTourPlan)
            .filter(
              (key) => !["id", "color", "image", "description"].includes(key)
            )
            .map((key) => (
              <div key={key}>
                <Label htmlFor={key} className="capitalize">
                  {tourPlanKeys[key]}
                </Label>
                <TextInput
                  type={
                    ["person", "price", "rate", "days"].includes(key)
                      ? "number"
                      : "text"
                  }
                  step={key === "price" ? 50 : key === "rate" ? 0.1 : 1}
                  min={0}
                  id={key}
                  {...register(key as keyof IPlan, { required: true })}
                />
              </div>
            ))}

          <div className="">
            <Label htmlFor="Color">Color</Label>
            <Select {...register("color")} id="color" defaultValue="gray">
              {colors.map((color) => (
                <option
                  value={color}
                  className="capitalize"
                  style={{ color }}
                  key={color}
                >
                  {color}
                </option>
              ))}
            </Select>
          </div>
          <div className="">
            <Label htmlFor="Color">Images</Label>
            <Select {...register("color")} id="color" defaultValue="gray">
              {Object.entries(images).map(([key, value]) => (
                <option value={value} className="capitalize" key={key}>
                  {key}
                </option>
              ))}
            </Select>
          </div>
          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              className="h-20"
              {...register("description", { required: true })}
            />
          </div>
          <Button
            type="submit"
            className="w-full"
            color="success"
            pill
            disabled={fetching}
            isProcessing={fetching}
          >
            {mode == "Create" ? "Save" : "Update"}
          </Button>
        </form>
      </>
    );
  };

  const PlanColumns = useMemo<MRT_ColumnDef<IPlan>[]>(
    () => [
      {
        header: "Title",
        accessorKey: "title",
      },
      {
        header: "Description",
        accessorKey: "description",
      },
      {
        header: "Price",
        accessorKey: "price",
      },
      {
        header: "Rate",
        accessorKey: "rate",
      },
      {
        header: "Person",
        accessorKey: "person",
      },
      {
        header: "Color",
        accessorKey: "color",
      },
      {
        header: "Days",
        accessorKey: "days",
      },
      {
        header: "Action",
        accessorFn: (item) => (
          <div className="flex space-x-3">
            <div
              className="ring-1 p-2 rounded-lg"
              onClick={() => handleEditTourPlan(item)}
            >
              <FaPen />
            </div>
            <div
              className="ring-1 p-2 rounded-lg"
              onClick={() => {
                setSelectedPlan(item);
                setMode("Delete");
                showModal();
              }}
            >
              <FaTrashCan />
            </div>
          </div>
        ),
      },
    ],
    []
  );

  return (
    <div>
      <Modal show={isModalVisible} size="lg" popup onClose={hideModal}>
        <Modal.Header>
          <center>
            <h3 className="m-4 text-center w-full font-medium text-primary">
              {mode} Package Plan
            </h3>
          </center>
        </Modal.Header>
        <hr />
        <Modal.Body>
          {mode == "Delete" ? (
            <>
              <center className="py-4">
                <div className="">
                  Do you want to delete {selectedPlan.title} Plan?
                </div>
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
              <TourPlanForm tourPlan={selectedPlan} />
              <Button type="button" onClick={hideModal} className="w-full mt-2">
                Cancel
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
      <div className="space-y-6">
        <Button type="button" onClick={handleCreateTour} className="w-full">
          <FaPlus className="mr-4" /> Add a New Plan
        </Button>
        <MaterialReactTable
          columns={PlanColumns}
          data={(tourPlans as IPlan[]) || []}
          renderEmptyRowsFallback={() =>
            fetching ? (
              <center className="p-4">
                <Spinner size="lg" />
              </center>
            ) : (
              <center className="p-10">No Plans Available</center>
            )
          }
        />
      </div>
    </div>
  );
};

export default TourPlanList;
