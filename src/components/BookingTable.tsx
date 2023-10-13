import {
  Button,
  Label,
  Modal,
  Select,
  Spinner,
  TextInput,
} from "flowbite-react";
import { FaCheck, FaPen, FaTrashCan } from "react-icons/fa6";
import { FaMinusCircle, FaTimes } from "react-icons/fa";
import { IBooking, IPlace, IUser } from "../api/@types";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { Types, defaultBooking, defaultUser } from "../api/contexts/reducer";
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useContext, useEffect, useMemo, useState } from "react";
import {
  useFetchCollection,
  useFetchSingleDoc,
  useQueryCollection,
} from "../api/hooks/fetchCollections";

import { AppContext } from "../api/contexts/context";
import { db } from "../firebase";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useLocalStorage from "../api/hooks/useLocalStorage";
import useModal from "../api/hooks/useModal";

const bookingKeys = {
  date: "Date",
  duration: "Duration",
  place: "Place",
  numGuests: "Number of Guests",
  userId: "",
  status: "Status",
  approved: "",
};

function BookingTable() {
  const [storageUser] = useLocalStorage<IUser>("tour-user", defaultUser);
  const { data: user } = useFetchSingleDoc<IUser>(
    "users",
    storageUser.uid ?? ""
  );
  const {
    data: places,
    refetch,
    fetching,
  } = useFetchCollection<IPlace>("places");
  const bookings = useQueryCollection("bookings", "userId", user.uid ?? "");
  const [selectedBooking, setBooking] = useState<IBooking>(defaultBooking);
  const [mode, setMode] = useState<"Edit" | "Delete">("Edit");
  const { hideModal, isModalVisible, showModal } = useModal();

  const { dispatch } = useContext(AppContext);

  const handleDelete = async (booking: IBooking) => {
    setMode("Delete");
    showModal();
    setBooking(booking);
  };
  const handleEdit = async (booking: IBooking) => {
    setMode("Edit");
    showModal();
    setBooking(booking);
  };

  const onDelete = async () => {
    const bookingRef = doc(db, "bookings", selectedBooking?.id || "");
    try {
      dispatch({ type: Types.setIsLoading, payload: true });
      await deleteDoc(bookingRef);
      refetch();
      await updateDoc(doc(db, "users", user.uid || ""), {
        bookings: arrayRemove(selectedBooking),
        noOfTourLeft: user.noOfTourLeft + 1,
      });
      hideModal();
      toast.success("Booking deleted successfully");
    } catch (error) {
      console.error("Error deleting booking:", error);
      toast.error("Something went wrong");
    } finally {
      dispatch({ type: Types.setIsLoading, payload: false });
    }
  };

  const BookingForm = () => {
    const { register, handleSubmit, setValue, reset } = useForm<IBooking>();

    useEffect(() => {
      reset(selectedBooking);
    }, [setValue, reset]);

    const onSubmit = async (formData: IBooking) => {
      try {
        dispatch({ type: Types.setIsLoading, payload: true });

        const tourPlanRef = doc(db, "bookings", selectedBooking?.id || "");
        await updateDoc(tourPlanRef, { ...formData });
        toast.success("Update complete");
        refetch();
      } catch (error) {
        console.log(
          "🚀 ~ file: BookingTable.tsx:91 ~ onSubmit ~ error:",
          error
        );
      } finally {
        dispatch({ type: Types.setIsLoading, payload: false });
      }
    };

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {Object.keys(defaultBooking)
            .filter((key) => !["userId", "place"].includes(key))
            .map((key) => (
              <div key={key}>
                <Label htmlFor={key}>{bookingKeys[key]}</Label>
                <TextInput
                  type={
                    ["duration", "guest"].includes(key)
                      ? "number"
                      : key === "date"
                      ? "date"
                      : "text"
                  }
                  min={0}
                  id={key}
                  {...register(key as keyof IBooking, { required: true })}
                />
              </div>
            ))}
          <div>
            <Label htmlFor="place">Description</Label>
            <Select
              required
              defaultValue={selectedBooking.place}
              {...register("place")}
            >
              <option
                value={selectedBooking.place}
                className="text-gray-500"
                disabled
              >
                {selectedBooking.place || "Choose your Destination"}
              </option>
              {places?.map(({ name }: IPlace, i: number) => (
                <option
                  key={i}
                  value={name}
                  className="h-fit grid rounded cursor-pointer"
                  // onClick={() => handleClick(name)}
                >
                  {name}
                </option>
              ))}
            </Select>
          </div>
          <div className="pt-6">
            <Button
              pill
              gradientDuoTone="greenToBlue"
              type="submit"
              className="w-full"
            >
              Save
            </Button>
            <Button
              type="button"
              pill
              color="failure"
              onClick={hideModal}
              className="w-full mt-4"
            >
              Cancel
            </Button>
          </div>
        </form>
      </>
    );
  };

  const bookingColumns = useMemo<MRT_ColumnDef<IBooking>[]>(
    () => [
      {
        header: "Date",
        accessorKey: "date",
      },
      {
        header: "Duration",
        accessorKey: "duration",
        size: 0.1,
      },
      {
        header: "Place",
        accessorKey: "place",
      },

      {
        header: "Guests",
        accessorKey: "numGuests",
      },

      {
        header: "Status",
        accessorFn: ({ status }) => (
          <div
            className="capitalize flex items-center gap-2"
            style={{
              color:
                status === "approved"
                  ? "green"
                  : status === "declined"
                  ? "red"
                  : "gray",
            }}
          >
            {status}{" "}
            {status === "approved" ? (
              <FaCheck />
            ) : status === "declined" ? (
              <FaTimes />
            ) : (
              <FaMinusCircle />
            )}
          </div>
        ),
      },
      {
        header: "Completed",
        accessorFn: ({ completed }) => (
          <div className="text-align">
            {completed ? (
              <FaCheck color="green"></FaCheck>
            ) : (
              <FaMinusCircle color="gray" />
            )}
          </div>
        ),
      },

      {
        header: " ",
        accessorFn: (item) => (
          <>
            {item.status !== "approved" ? (
              <div className="flex space-x-4 cursor-pointer">
                <div
                  className="ring-1 hover:bg-blue-50 p-2 rounded-lg"
                  onClick={() => handleEdit(item)}
                >
                  <FaPen />
                </div>
                <div
                  className="ring-1 hover:bg-blue-100 p-2 rounded-lg"
                  onClick={() => handleDelete(item)}
                >
                  <FaTrashCan />
                </div>
              </div>
            ) : null}
          </>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Modal show={isModalVisible} size="lg" popup onClose={hideModal}>
        <Modal.Header>
          <center className="my-4">
            <h3 className="m-4 text-center w-full font-medium text-primary">
              {mode} Booking
            </h3>
          </center>
        </Modal.Header>
        <hr />
        {mode == "Delete" ? (
          <>
            <Modal.Body className="my-6">
              <center className="py-4">
                <div className="">Do you want to delete this Booking?</div>
              </center>
            </Modal.Body>
            <hr />
            <Modal.Footer>
              <div className="flex w-full justify-end space-x-6">
                <Button
                  isProcessing={fetching}
                  type="button"
                  size="sm"
                  color="failure"
                  onClick={() => onDelete()}
                  className="mt-2"
                >
                  Ok
                </Button>

                <Button
                  color="gray"
                  size="sm"
                  type="button"
                  onClick={hideModal}
                  className="mt-2"
                >
                  Cancel
                </Button>
              </div>
            </Modal.Footer>
          </>
        ) : (
          <Modal.Body>
            <BookingForm />
          </Modal.Body>
        )}
      </Modal>
      <MaterialReactTable
        columns={bookingColumns}
        data={bookings as IBooking[]}
        enableRowSelection
        rowCount={5}
        renderEmptyRowsFallback={() =>
          fetching ? (
            <center className="p-4">
              <Spinner size="lg" />
            </center>
          ) : (
            <center className="p-10">You haven't booked any tour yet</center>
          )
        }
      />
    </>
  );
}
export default BookingTable;
