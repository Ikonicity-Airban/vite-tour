import { Booking, IUser, Tour } from "../api/@types";

import { DocumentData } from "firebase/firestore";
import { MaterialReactTable } from "material-react-table";
import { Avatar, Table } from "flowbite-react";

interface Props {
  data: Booking[] | DocumentData;
}

const TourPlanTable = ({ data }: Props) => {
  return (
    <div className="overflow-x-auto">
      <Table className="min-w-[60rem]">
        <Table.Head>
          <Table.HeadCell>ID</Table.HeadCell>
          <Table.HeadCell>Location</Table.HeadCell>
          <Table.HeadCell>Date</Table.HeadCell>
          <Table.HeadCell>Duration</Table.HeadCell>
          <Table.HeadCell>Number of Guests</Table.HeadCell>
        </Table.Head>
        <Table.Body>
          {data.length ? (
            data.map((booking: Booking, i: number) => (
              <Table.Row key={i} className="min-w-fit">
                <Table.Cell>{truncateString(booking.id, 15)}</Table.Cell>
                <Table.Cell>{booking.place}</Table.Cell>
                <Table.Cell>{booking.date}</Table.Cell>
                <Table.Cell>{booking.duration}</Table.Cell>
                <Table.Cell>{booking.numGuests}</Table.Cell>
                <Table.Cell>{booking.plan}</Table.Cell>
                {/* <Table.Cell></Table.Cell>
                <Table.Cell></Table.Cell> */}
              </Table.Row>
            ))
          ) : (
            <Table.Row>
              <Table.Cell colSpan={4} className="p-10 text-center">
                No Bookings recorded
              </Table.Cell>
            </Table.Row>
          )}
        </Table.Body>
      </Table>
    </div>
  );
};

export default TourPlanTable;

import { type MRT_ColumnDef } from "material-react-table";
import { truncateString } from "../api/helper";
// If using TypeScript (optional, but recommended)

interface ITourTableProp {
  users: IUser[] | DocumentData;
}

const userColumns: MRT_ColumnDef<IUser>[] = [
  {
    header: "Photo",
    accessorKey: "photoURL",
    accessorFn: ({ photoURL, email }) => (
      <Avatar
        img={photoURL || ""}
        rounded
        placeholderInitials={photoURL || email.slice(0, 2).toUpperCase()}
      />
    ),
  },
  {
    header: "Name",
    accessorKey: "displayName",
  },
  {
    header: "Email",
    accessorKey: "email",
  },
  {
    header: "Phone",
    accessorKey: "plan.title",
  },
];

export function UserTable({ users }: ITourTableProp) {
  return (
    <MaterialReactTable
      columns={userColumns}
      data={users as IUser[]}
    ></MaterialReactTable>
  );
}
