import {
  Button,
  FileInput,
  Label,
  Modal,
  Spinner,
  TextInput,
  Textarea,
} from "flowbite-react";
import { ChangeEvent, useMemo, useState } from "react";
import { FaPen, FaPlus, FaTrashCan } from "react-icons/fa6";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";

import { FaTimes } from "react-icons/fa";
import { IPlace } from "../../api/@types";
import React from "react";
import { db } from "../../firebase";
import toast from "react-hot-toast";
import { truncateString } from "../../api/helper";
import { useFetchCollection } from "../../api/hooks/fetchCollections";
import { useForm } from "react-hook-form";
import useModal from "../../api/hooks/useModal";

const defaultTourSite: IPlace = {
  id: "",
  name: "",
  about: "",
  tags: "",
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
  const {
    data: places,
    refetch,
    fetching,
  } = useFetchCollection<IPlace>("places");
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
    const [images, setImages] = useState<string[]>(selectedSite.images);
    const [addedImage, setAddedImage] = useState<string>("");

    function handleDeleteImage(img: string) {
      setImages(images.filter((image) => image !== img));
    }

    async function handleUpload() {
      try {
        await updateDoc(doc(db, "places", selectedSite.id), { images: images });
        toast.success("Update completed image added successfully");
      } catch (error) {
        error instanceof Error && toast.error(error.message);
      } finally {
        hideModal();
        refetch();
      }
    }

    const handleFileInputChange = (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => {
          const dataURL = reader.result as string;
          // Pass dataURL to parent component
          setAddedImage(dataURL);
          setImages((prev) => [...prev, dataURL]);
        };

        reader.readAsDataURL(file);
      }
    };
    return (
      <form className="w-full my-10">
        {images && (
          <div className="w-full flex mb-10 items-center gap-4">
            {images?.map((image) => (
              <div
                key={image}
                className="ring-1 rounded-lg p-1 w-1/3 flex text-xs justify-between h-16 items-center relative"
              >
                <img
                  src={image}
                  alt="image"
                  className="object-cover w-full h-full"
                />
                <FaTimes
                  type="search"
                  onClick={() => handleDeleteImage(image)}
                  className="text-red-600 cursor-pointer absolute -top-4 -right-2 ring-1 ring-slate-500 p-1 rounded-full"
                />
              </div>
            ))}
            <hr />
          </div>
        )}
        <Label htmlFor="images" className="first-letter:capitalize">
          You can add a new image url or upload an image
        </Label>
        <TextInput
          id="images"
          placeholder="Add a url"
          value={addedImage}
          onChange={(e) => setAddedImage(e.target.value)}
        />
        <center>or</center>

        <div className="space-y-6">
          <FileInput
            required={!addedImage}
            accept="image/*"
            onChange={handleFileInputChange}
            id="image"
          />{" "}
        </div>
        <div className="flex h-auto items-center justify-between gap-4 my-4">
          <Button
            className="w-full"
            pill
            color="success"
            onClick={handleUpload}
          >
            Save Image
          </Button>
          <Button
            type="button"
            onClick={hideModal}
            className="w-full mt-2"
            pill
            color="failure"
          >
            Cancel
          </Button>
        </div>
      </form>
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
          const tourSiteRef = collection(db, "places");
          await addDoc(tourSiteRef, { ...formData, images: [] });
          toast.success("Successfully created a site");
          setSelectedSite({ ...formData, images: [] });
          setMode("Edit Photo");
        } else {
          const tourPlanRef = doc(db, "places", formData.id);
          await updateDoc(tourPlanRef, { ...formData });
          toast.success("Successfully updated site");
          hideModal();
        }
        refetch();
      } catch (error) {
        if (error instanceof Error) {
          toast.error(error.message);
        }
      } finally {
        reset(defaultTourSite);
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
          <div className="flex items-center justify-between gap-4">
            <Button type="submit" className="w-full" pill color="success">
              Save
            </Button>
            <Button
              type="button"
              onClick={hideModal}
              className="w-full mt-2"
              pill
              color="failure"
            >
              Cancel
            </Button>
          </div>
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
              {mode} Site
            </h3>
          </center>
        </Modal.Header>
        <hr />
        <Modal.Body>
          {mode == "Delete" ? (
            <>
              <center className="py-4">
                <h3 className="">Do you want to delete this site?</h3>
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
          renderEmptyRowsFallback={() =>
            fetching ? (
              <center className="p-4">
                <Spinner size="lg" />
              </center>
            ) : (
              <center className="p-10">No Site Available</center>
            )
          }
        />
      </div>
    </div>
  );
};

export default TourSiteList;
