import { Button, Checkbox, Label, Modal, Spinner } from "flowbite-react";
import { DocumentData, doc, updateDoc } from "firebase/firestore";
import { FaCheck, FaPen } from "react-icons/fa6";
import { FaMinusCircle, FaTimes } from "react-icons/fa";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { useEffect, useMemo, useState } from "react";

import { Booking } from "../api/@types";
import { db } from "../firebase";
import { defaultBooking } from "../api/reducer";
import toast from "react-hot-toast";
import { useFetchCollection } from "../api/fetchCollections";
import { useForm } from "react-hook-form";
import useModal from "../api/useModal";

function AllBookingTable() {
  const { data: bookings, refetch } = useFetchCollection<Booking>("bookings");
  const [bookingList, setBookingList] = useState<Booking[] | DocumentData>(
    bookings
  );
  const [selectedBooking, setSelectedBooking] =
    useState<Booking>(defaultBooking);
  const [mode, setMode] = useState<"Edit" | "Delete">("Edit");
  const { hideModal, isModalVisible, showModal } = useModal();

  useEffect(() => {
    setBookingList(bookings);
  }, []);

  const handleEdit = async (booking: Booking) => {
    setSelectedBooking(booking);
    setMode("Edit");
    showModal();
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
        refetch();
        toast.success("Update complete");
      } catch (error) {
        console.log(
          "🚀 ~ file: AllBookingTable.tsx:42 ~ onSubmit ~ error:",
          error
        );
      }
    };

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div>
            <Label htmlFor="place">Status</Label>
            <select
              required
              defaultValue={selectedBooking.status}
              className="w-full space-y-2 block outline-none p-3 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              {...register("status")}
            >
              {["Declined", "Approved", "Idle"].map((item) => (
                <option
                  value={item.toLowerCase()}
                  key={item}
                  className="text-gray-500"
                >
                  {item}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              size={30}
              defaultChecked={selectedBooking.completed}
              {...register("completed")}
            />
            <Label htmlFor="place">Complete</Label>
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
        header: "User Email",
        accessorKey: "email",
      },
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
          <div className="flex space-x-4">
            <div
              className="ring-1 p-2 rounded-lg"
              onClick={() => handleEdit(item)}
            >
              <FaPen />
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
              {mode} Bookings
            </h3>
          </center>
        </Modal.Header>
        <hr />
        <Modal.Body>
          <>
            <BookingForm />
            <Button type="button" onClick={hideModal} className="w-full mt-2">
              Cancel
            </Button>
          </>
        </Modal.Body>
      </Modal>
      <MaterialReactTable
        columns={bookingColumns}
        renderEmptyRowsFallback={() => (
          <center className="p-4">
            <Spinner size="lg" />
          </center>
        )}
        data={(bookingList as Booking[]) || []}
        enableRowSelection
        rowCount={5}
      />
    </>
  );
}
export default AllBookingTable;
