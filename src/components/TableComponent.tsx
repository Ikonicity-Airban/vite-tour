import { IUser } from "../api/@types";

import { DocumentData } from "firebase/firestore";
import { MaterialReactTable } from "material-react-table";
import { Avatar, Spinner } from "flowbite-react";

import { type MRT_ColumnDef } from "material-react-table";

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
        placeholderInitials={photoURL || email?.slice(0, 2).toUpperCase()}
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
    header: "Last Login Date",
    accessorKey: "lastLoggedIn",
  },
];

export function UserTable({ users }: ITourTableProp) {
  return (
    <MaterialReactTable
      columns={userColumns}
      data={users as IUser[]}
      renderEmptyRowsFallback={() => (
        <center className="p-4">
          <Spinner size="lg" />
        </center>
      )}
    ></MaterialReactTable>
  );
}

/*  */
