import { IPlace, IUser } from "../api/@types";

import { BookNowComponent } from "../components";
import BookingTable from "../components/BookingTable";
import { Button } from "flowbite-react";
import CardComponent from "../components/Card";
import GoogleMap from "../components/GoogleMap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import LoadingSection from "../components/LoadingSection";
import Section from "../components/Section";
import { defaultUser } from "../api/reducer";
import { shuffleArray } from "../api/helper";
import { useFetchCollection } from "../api/fetchCollections";
import useLocalStorage from "../api/useLocalStorage";

function Dashboard() {
  const [user] = useLocalStorage<IUser>("tour-user", defaultUser);
  const places = useFetchCollection<IPlace>("places");

  return (
    <div className="block w-full mx-auto">
      <Helmet>
        <title>Dashboard | {user.email}</title>
      </Helmet>

      <Section title="My Recent bookings" id="">
        {/* <BookingTable data={bookings} /> */}
        <BookingTable />
        <Link to="bookings">
          <Button>See more bookings</Button>
        </Link>
      </Section>
      <Section id="places" subtitle="Tourism Centers">
        <LoadingSection />
        <div className="grid sm:grid-cols-2 place-items-center md:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 gap-6">
          {places.slice(0, 6).map((source) => (
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
