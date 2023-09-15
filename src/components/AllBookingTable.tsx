import {
  Button,
  Checkbox,
  Label,
  Modal,
  Select,
  Spinner,
} from "flowbite-react";
import { FaCheck, FaPen } from "react-icons/fa6";
import { FaMinusCircle, FaTimes } from "react-icons/fa";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { doc, updateDoc } from "firebase/firestore";
import { useEffect, useMemo, useState } from "react";

import { Booking } from "../api/@types";
import { db } from "../firebase";
import { defaultBooking } from "../api/contexts/reducer";
import toast from "react-hot-toast";
import { useFetchCollection } from "../api/hooks/fetchCollections";
import { useForm } from "react-hook-form";
import useModal from "../api/hooks/useModal";

function AllBookingTable() {
  const {
    data: bookings,
    refetch,
    fetching,
  } = useFetchCollection<Booking>("bookings");
  const [selectedBooking, setSelectedBooking] =
    useState<Booking>(defaultBooking);
  const [mode, setMode] = useState<"Edit" | "Delete">("Edit");
  const { hideModal, isModalVisible, showModal } = useModal();

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
        error instanceof Error && toast.error(error.message);
      } finally {
        hideModal();
      }
    };

    return (
      <>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-10 py-4">
          <div>
            <Label htmlFor="place">Status</Label>
            <Select
              required
              defaultValue={selectedBooking.status}
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
            </Select>
          </div>
          <div className="flex items-center space-x-2">
            <Checkbox
              size={50}
              defaultChecked={selectedBooking.completed}
              {...register("completed")}
            />
            <Label htmlFor="place">Complete</Label>
          </div>
          <Button type="submit" className="w-full" pill color="success">
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
            <Button
              pill
              type="button"
              onClick={hideModal}
              className="w-full mt-2"
              color="failure"
            >
              Cancel
            </Button>
          </>
        </Modal.Body>
      </Modal>
      <MaterialReactTable
        columns={bookingColumns}
        memoMode="rows"
        renderEmptyRowsFallback={() =>
          fetching ? (
            <center className="p-4">
              <Spinner size="lg" />
            </center>
          ) : (
            <center className="p-10">No Bookings Available</center>
          )
        }
        data={(bookings as Booking[]) || []}
        enableRowSelection
        rowCount={5}
      />
    </>
  );
}
export default AllBookingTable;
