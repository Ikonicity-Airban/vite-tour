import { IUser } from "../api/@types";

import { MaterialReactTable } from "material-react-table";
import { Avatar, Spinner } from "flowbite-react";

import { type MRT_ColumnDef } from "material-react-table";
import { useFetchCollection } from "../api/hooks/fetchCollections";
import { useMemo } from "react";

// If using TypeScript (optional, but recommended)

export function UserTable() {
  const userColumns = useMemo<MRT_ColumnDef<IUser>[]>(
    () => [
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
    ],
    []
  );

  const { data: users, fetching } = useFetchCollection("users");
  return (
    <MaterialReactTable
      columns={userColumns}
      data={users as IUser[]}
      renderEmptyRowsFallback={() =>
        fetching ? (
          <center className="p-4">
            <Spinner size="lg" />
          </center>
        ) : (
          <center className="p-10">No Users Available</center>
        )
      }
    ></MaterialReactTable>
  );
}

/*  */
