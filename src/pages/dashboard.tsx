import { Booking, IPlace, IUser } from "../api/@types";
import MaterialReactTable, { MRT_ColumnDef } from "material-react-table";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  updateDoc,
} from "firebase/firestore";
import {
  useFetchCollection,
  useQueryCollection,
} from "../api/fetchCollections";

import { BookNowComponent } from "../components";
import CardComponent from "../components/Card";
import { FaTrashCan } from "react-icons/fa6";
import GoogleMap from "../components/GoogleMap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import LoadingSection from "../components/LoadingSection";
import Section from "../components/Section";
import { db } from "../firebase";
import { defaultUser } from "../api/reducer";
import { shuffleArray } from "../api/helper";
import useLocalStorage from "../api/useLocalStorage";

function Dashboard() {
  const [user] = useLocalStorage<IUser>("tour-user", defaultUser);
  const places = useFetchCollection<IPlace>("places");
  const bookings = useQueryCollection("bookings", "userId", user.uid ?? "");

  const handleDelete = async (docId: string) => {
    if (!docId) return;
    try {
      const collectionRef = collection(db, "booking");
      const documentRef = doc(collectionRef, docId);
      await deleteDoc(documentRef);
      console.log("Document deleted successfully");
    } catch (error) {
      console.error("Error deleting document:", error);
    }

    const tourPlansRef = collection(db, "plans");
    const snapshot = await getDocs(tourPlansRef);
    const data = snapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Booking)
    );
  };

  const handleEdit = async (booking: Booking) => {
    const tourPlanRef = doc(db, "bookings", booking?.id || "");
    await updateDoc(tourPlanRef, { ...booking });
  };

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
      header: " ",
      accessorFn: ({ id }) => (
        <div className="flex space-x-4">
          <div
            className="ring-1 p-2 rounded-lg"
            onClick={() => handleDelete(id || "")}
          >
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
          onEditingRowSave={(item) => handleEdit(item.row.original)}
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
