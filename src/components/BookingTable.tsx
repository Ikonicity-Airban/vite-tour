import { Booking, IPlace, IUser } from "../api/@types";
import { Button, Label, Modal, TextInput } from "flowbite-react";
import { FaCheck, FaPen, FaTrashCan } from "react-icons/fa6";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { defaultBooking, defaultUser } from "../api/reducer";
import { deleteDoc, doc, updateDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";
import {
  useFetchCollection,
  useQueryCollection,
} from "../api/fetchCollections";

import { FaMinusCircle } from "react-icons/fa";
import { db } from "../firebase";
import toast from "react-hot-toast";
import { useForm } from "react-hook-form";
import useLocalStorage from "../api/useLocalStorage";
import useModal from "../api/useModal";

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
  const [user] = useLocalStorage<IUser>("tour-user", defaultUser);
  const places = useFetchCollection<IPlace>("places");
  const bookings = useQueryCollection("bookings", "userId", user.uid ?? "");
  const [selectedBooking, setBooking] = useState<Booking>(defaultBooking);
  const [mode, setMode] = useState<"Edit" | "Delete">("Edit");
  const { hideModal, isModalVisible, showModal } = useModal();

  const handleDelete = async (booking: Booking) => {
    setMode("Delete");
    showModal();
    setBooking(booking);
  };
  const handleEdit = async (booking: Booking) => {
    setMode("Edit");
    showModal();
    setBooking(booking);
  };

  const onDelete = async () => {
    const bookingRef = doc(db, "bookings", selectedBooking?.id || "");

    try {
      await deleteDoc(bookingRef);
      console.log("Booking deleted successfully");
      location.reload();
    } catch (error) {
      console.error("Error deleting booking:", error);
    }
  };

  const BookingForm = () => {
    const { register, handleSubmit, setValue, reset } = useForm<Booking>();

    useEffect(() => {
      reset(selectedBooking);
    }, [setValue, reset]);

    const onSubmit = async (formData: Booking) => {
      try {
        const tourPlanRef = doc(db, "bookings", selectedBooking?.id || "");
        await updateDoc(tourPlanRef, { ...formData });
        toast.success("Update complete");
        location.reload();
      } catch (error) {
        console.log("🚀 ~ file: dashboard.tsx:81 ~ onSubmit ~ error:", error);
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
                  {...register(key as keyof Booking, { required: true })}
                />
              </div>
            ))}
          <div>
            <Label htmlFor="place">Description</Label>
            <select
              required
              defaultValue={selectedBooking.place}
              className="w-full space-y-2 block outline-none p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
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
            </select>
          </div>
          <Button type="submit" className="w-full">
            Save
          </Button>
        </form>
      </>
    );
  };

  const bookingColumns: MRT_ColumnDef<Booking>[] = useMemo(
    () => [
      {
        header: "Date",
        accessorKey: "date",
      },
      {
        header: "Duration",
        accessorKey: "duration",
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
        accessorFn: ({ status }) => <center>{status}</center>,
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
          <div className="flex space-x-4">
            <div
              className="ring-1 p-2 rounded-lg"
              onClick={() => handleEdit(item)}
            >
              <FaPen />
            </div>
            <div
              className="ring-1 p-2 rounded-lg"
              onClick={() => handleDelete(item)}
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
    <>
      <Modal show={isModalVisible} size="lg" popup onClose={hideModal}>
        <Modal.Header>
          <center>
            <h3 className="m-4 text-center w-full font-medium text-primary">
              {mode} Booking
            </h3>
          </center>
        </Modal.Header>
        <hr />
        <Modal.Body>
          {mode == "Delete" ? (
            <>
              <center className="py-4">
                <div className="">Do you want to delete this Booking?</div>
              </center>
              <div className="flex w-full justify-end space-x-6">
                <Button
                  type="button"
                  color="failure"
                  onClick={() => onDelete()}
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
              <BookingForm />
              <Button type="button" onClick={hideModal} className="w-full mt-2">
                Cancel
              </Button>
            </>
          )}
        </Modal.Body>
      </Modal>
      <MaterialReactTable
        columns={bookingColumns}
        data={bookings as Booking[]}
        enableRowSelection
        rowCount={5}
      />
    </>
  );
}
export default BookingTable;
