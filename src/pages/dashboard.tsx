import { FaPen, FaTrashCan } from "react-icons/fa6";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";

import { AppContext } from "../api/context";
import { BookNowComponent } from "../components";
import { Booking } from "../api/@types";
import CardComponent from "../components/Card";
import GoogleMap from "../components/GoogleMap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import LoadingSection from "../components/LoadingSection";
import Section from "../components/Section";
import { shuffleArray } from "../api/helper";
import { useContext } from "react";
import { useQueryCollection } from "../api/fetchCollections";

function Dashboard() {
  const {
    state: { places, user },
  } = useContext(AppContext);
  const bookings = useQueryCollection("bookings", "userId", user.uid);

  const bookingColumns: MRT_ColumnDef<Booking>[] = [
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
      header: "Action",
      accessorFn: () => (
        <div className="flex space-x-4">
          <div
            className="ring-1 p-2 rounded-lg"
            // onClick={() => handleEdit(tourPlan)}
          >
            <FaPen />
          </div>
          <div className="ring-1 p-2 rounded-lg" /* onClick={() => ha} */>
            <FaTrashCan />
          </div>
        </div>
      ),
    },
  ];
  return (
    <div className="block w-full mx-auto">
      <Helmet>
        <title>Dashboard | {user.email}</title>
      </Helmet>
      <Section title="Your Recent booking" id="">
        {/* <BookingTable data={bookings} /> */}
        <MaterialReactTable
          columns={bookingColumns}
          data={bookings as Booking[]}
          enableRowSelection
          enableEditing
        />
      </Section>
      <Section id="places" subtitle="Tourism Centers">
        <LoadingSection />
        <div className="grid sm:grid-cols-2 place-items-center md:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-6">
          {shuffleArray(places)
            .slice(0, 6)
            .map((source) => (
              <Link
                to={`/tours/${source.name.split(" ").join("-")}`}
                state={source}
                key={source.about}
              >
                <CardComponent
                  source={{ ...source, source: shuffleArray(source.images)[0] }}
                />
              </Link>
            ))}
        </div>
      </Section>
      <Section subtitle="Start Booking Now" title="We are waiting">
        <BookNowComponent destination="" />
      </Section>
      <GoogleMap withSearch={true} />
    </div>
  );
}

export default Dashboard;
