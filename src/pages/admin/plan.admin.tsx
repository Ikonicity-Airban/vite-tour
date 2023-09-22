import {
  Button,
  Card,
  Label,
  Modal,
  Rating,
  Select,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import {
  FaClock,
  FaNairaSign,
  FaPen,
  FaPlus,
  FaTrashCan,
  FaUsers,
} from "react-icons/fa6";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { useMemo, useState } from "react";

import { IPlan } from "../../api/@types";
import React from "react";
import { db } from "../../firebase";
import toast from "react-hot-toast";
import { useFetchCollection } from "../../api/hooks/fetchCollections";
import { useForm } from "react-hook-form";
import useModal from "../../api/hooks/useModal";

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
          // const id = randomUUID();
          const tourPlansRef = collection(db, "plans");
          await addDoc(tourPlansRef, { ...formData });
        } else {
          const tourPlanRef = doc(db, "plans", selectedPlan.id);
          await updateDoc(tourPlanRef, { ...formData });
        }
        refetch();
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
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="py-4 grid grid-cols-2 gap-6 justify-between"
        >
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
                  autoCapitalize="characters"
                  type={
                    ["person", "price", "rate", "days"].includes(key)
                      ? "number"
                      : "text"
                  }
                  step={key === "price" ? 50 : key === "rate" ? 0.1 : 1}
                  min={0}
                  max={key == "rate" ? 5.0 : Number.POSITIVE_INFINITY}
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
            <Label htmlFor="image">Images</Label>
            <Select
              {...register("image")}
              id="image"
              defaultValue="fa fa-suitcase"
            >
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
            className="w-full col-span"
            color="success"
            pill
            disabled={fetching}
            isProcessing={fetching}
          >
            {mode == "Create" ? "Save" : "Update"}
          </Button>
          <Button
            type="button"
            color="failure"
            pill
            onClick={hideModal}
            className="w-full mt-2"
          >
            Cancel
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
        accessorFn: ({ color }) => <span style={{ color }}>{color}</span>,
      },
      {
        header: "Image",
        accessorFn: ({ image, color }) => (
          <i className={image + " text-3xl"} style={{ color }}></i>
        ),
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
              className="ring-1 p-2 rounded-lg cursor-pointer"
              onClick={() => handleEditTourPlan(item)}
            >
              <FaPen />
            </div>
            <div
              className="ring-1 p-2 rounded-lg cursor-pointer"
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

  const PlanModal = () => (
    <Modal show={isModalVisible} size="2xl" popup onClose={hideModal}>
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
          </>
        )}
      </Modal.Body>
    </Modal>
  );
  return (
    <div>
      <PlanModal />
      <div className="space-y-20">
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
        <div className="grid-card my-20">
          {tourPlans.map((plan: IPlan) => (
            <PlanCard plan={plan} key={plan.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

function PlanCard({ plan }: { plan: IPlan }) {
  const { title, description, image, price, rate, days, person, color } = plan;

  return (
    <Card
      className={
        "rounded-lg shadow-lg h-full overflow-hidden text-center max-w-sm w-full"
      }
    >
      <i
        className={image + " text-7xl text-center w-full"}
        style={{ color }}
      ></i>
      <div className="p-2  flex flex-col justify-between h-full">
        <h2 className="mb-10 font-light" style={{ color }}>
          {title}
        </h2>
        <p className="mb-4 font-medium text-lg">{description}</p>
        <ul className="mb-4 space-y-3">
          <li className="flex items-center gap-2  text-sm mb-1">
            <Rating>
              <Rating.Star></Rating.Star>
            </Rating>
            Rating: {rate}
          </li>
          <li className="flex items-center gap-2  text-sm mb-1">
            <FaClock />
            <span>Duration: {days} days</span>
          </li>
          <li className="flex gap-2 items-center  text-sm mb-1">
            <FaUsers /> <span>Number of people: {person}</span>
          </li>
          <li className={" py-6 "}>
            <h3
              style={{ color }}
              className="font-bold inline-flex items-center space-x-2"
            >
              Price: <FaNairaSign className="ml-2 text-xl" />
              {price}
            </h3>
          </li>
        </ul>
      </div>
    </Card>
  );
}

export default TourPlanList;
