import {
  DocumentData,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useContext, useEffect, useState } from "react";

import { AppContext } from "../api/context";
import CardComponent from "../components/Card";
import GoogleMap from "../components/GoogleMap";
import { Link } from "react-router-dom";
import LoadingSection from "../components/LoadingSection";
import Section from "../components/Section";
import TableComponent from "../components/TableComponent";
import { Tour } from "../api/@types";
import { db } from "../firebase";
import { shuffleArray } from "../api/helper";

function Dashboard() {
  const {
    state: { places, user },
  } = useContext(AppContext);
  const [bookings, setBookings] = useState<Tour[] | DocumentData>([]);

  useEffect(() => {
    try {
      const q = query(
        collection(db, "bookings"),
        where("email", "==", user.email)
      );
      const fetchCollection = async () => {
        const querySnapshot = await getDocs(q);
        setBookings(querySnapshot.docs.map((doc) => doc.data()));
      };
      fetchCollection();
    } catch (error) {
      alert(error);
    }
  }, [user]);

  return (
    <div className="block w-full mx-auto">
      {/* <Helmet>
        <title>{user.email}</title>
      </Helmet>
       */}
      <Section title="Your Recent booking">
        <TableComponent data={bookings} />
      </Section>
      <Section id="places" subtitle="Tourism Centers">
        {/* <GoogleMap query="Enugu" /> */}
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
      <GoogleMap withSearch={true} />
    </div>
  );
}

export default Dashboard;
