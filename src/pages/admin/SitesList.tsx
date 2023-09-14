import {
  Button,
  FileInput,
  Label,
  Modal,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { FaPen, FaPlus, FaTrashCan } from "react-icons/fa6";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { deleteDoc, doc, setDoc, updateDoc } from "firebase/firestore";
import { useMemo, useState } from "react";

import { IPlace } from "../../api/@types";
import React from "react";
import { db } from "../../firebase";
import { v4 as randomUUID } from "uuid";
import toast from "react-hot-toast";
import { truncateString } from "../../api/helper";
import { useFetchCollection } from "../../api/fetchCollections";
import { useForm } from "react-hook-form";
import useModal from "../../api/useModal";

const defaultTourSite: IPlace = {
  id: "",
  name: "",
  about: "",
  tags: "",
  other: [],
  images: [""],
};

interface Props {
  tourSite?: IPlace;
}

interface FormData extends IPlace {
  time: Date;
}

const TourSiteList = () => {
  const [mode, setMode] = useState<"Create" | "Edit" | "Delete" | "Edit Photo">(
    "Create"
  );

  const { data: places, refetch } = useFetchCollection<IPlace>("places");
  const { hideModal, isModalVisible, showModal } = useModal();
  const [selectedSite, setSelectedSite] = useState<IPlace>(defaultTourSite);

  const handleCreateTour = () => {
    setSelectedSite(defaultTourSite);
    setMode("Create");
    showModal();
  };
  const handleEditTourPlan = async (tourSite: IPlace) => {
    setSelectedSite(tourSite);
    setMode("Edit");
    showModal();
  };

  const handleEditPhoto = async (tourSite: IPlace) => {
    setSelectedSite(tourSite);

    setMode("Edit Photo");
    showModal();
  };

  const handleDeleteTourPlan = async (docId: string) => {
    try {
      const documentRef = doc(db, "places", docId);
      await deleteDoc(documentRef);
      console.log("Document deleted successfully");
    } catch (error) {
      console.error("Error deleting document:", error);
    } finally {
      hideModal();
    }
  };

  const ImageRenderer = () => {
    return (
      <div className="relative">
        <div className="flex my-10 gap-2">
          {selectedSite.images?.map((image) => (
            <div key={image} className="w-32 hover:">
              <img src={image} alt="image" className="rounded-lg" />
            </div>
          ))}
        </div>
        <Label htmlFor="images" className="capitalize">
          Images
        </Label>
        <TextInput id="images" placeholder="Add a url" />
        <center>or</center>
        <FileInput />
        <Button className="absolute right-0 bottom-0">
          <FaPlus />
        </Button>
      </div>
    );
  };

  const TourPlanForm = ({ tourSite = selectedSite }: Props) => {
    const { register, handleSubmit, setValue, reset } = useForm<FormData>();

    React.useEffect(() => {
      reset(selectedSite);
    }, [tourSite, setValue, reset]);

    const onSubmit = async (formData: FormData) => {
      try {
        if (mode == "Create") {
          const id = randomUUID();
          const tourSiteRef = doc(db, "plans", id);
          await setDoc(tourSiteRef, { ...formData, id, images: [] });
        } else {
          const tourPlanRef = doc(db, "places", formData.id);
          await updateDoc(tourPlanRef, { ...formData });
        }
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        refetch();
        reset(defaultTourSite);
        hideModal();
      }
    };

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 py-4">
          {Object.keys(defaultTourSite)
            .filter((key) => !["id", "images", "about"].includes(key))
            .map((key) => (
              <div key={key}>
                <Label htmlFor={key} className="capitalize">
                  {key}
                </Label>
                <TextInput
                  type={[""].includes(key) ? "number" : "text"}
                  min={0}
                  id={key}
                  {...register(key as keyof IPlace, { required: true })}
                />
              </div>
            ))}
          <div>
            <Label htmlFor="about">About</Label>
            <Textarea
              id="about"
              className="h-20"
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

  const siteColumns: MRT_ColumnDef<IPlace>[] = useMemo(
    () => [
      {
        header: "Name",
        accessorKey: "name",
      },
      {
        header: "Tags",
        accessorKey: "tags",
      },
      {
        header: "About",
        accessorFn: ({ about }) => truncateString(about, 30),
      },

      {
        header: "Images",
        accessorFn: ({ images }) => (
          <div className="flex w-10 gap-3 object-contain">
            {images.slice(0, 3).map((image, i) => (
              <img src={image} alt="image" key={i} />
            ))}
          </div>
        ),
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
            <Button
              size="xs"
              outline
              pill
              onClick={() => handleEditPhoto(item)}
            >
              Edit photo
            </Button>
            <div
              className="ring-1 p-2 rounded-lg"
              onClick={() => {
                setSelectedSite(item);
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
                  onClick={() => handleDeleteTourPlan(selectedSite?.id)}
                  className="mt-2"
                >
                  Ok
                </Button>

                <Button type="button" onClick={hideModal} className="mt-2">
                  Cancel
                </Button>
              </div>
            </>
          ) : mode == "Edit Photo" ? (
            <>
              <form>
                <ImageRenderer />
              </form>
            </>
          ) : (
            <>
              <TourPlanForm tourSite={selectedSite} />
              <Button type="button" onClick={hideModal} className="w-full mt-2">
                Cancel
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
      <div className="space-y-10">
        <Button
          color="blue"
          type="button"
          onClick={handleCreateTour}
          className="w-full mt-2"
        >
          <FaPlus className="mr-4" /> Add a New Place
        </Button>
        <MaterialReactTable
          columns={siteColumns}
          data={places as IPlace[]}
          renderEmptyRowsFallback={() => (
            <center className="p-4">
              <Spinner size="lg" />
            </center>
          )}
        />
      </div>
    </div>
  );
};

export default TourSiteList;
