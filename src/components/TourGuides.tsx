/* import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import { useFetchCollection } from "../api/hooks/fetchCollections";
import { ITourGuide } from "../api/@types";
import { Spinner } from "flowbite-react";
import { useMemo } from "react";

function TourGuidesList() {
  const { data: tourGuides, refetch, fetching } = useFetchCollection<ITourGuide>("guides");

      const tourGuideColumns = useMemo<MRT_ColumnDef<ITourGuide>[]> (
        () => [
            {
                header: "Name",
                accessorKey: "name"
            }
        ]

        , []
    ) 

  return (
    <div>
      <MaterialReactTable
        // columns={tourGuideColumns}
        // data={users as IUser[]}
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
    </div>
  );
}

export default TourGuidesList;
 */
