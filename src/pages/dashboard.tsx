import { AppContext } from "../api/context";
import { BookNowComponent } from "../components";
import BookingTable from "../components/BookingTable";
import { Button } from "flowbite-react";
import CardComponent from "../components/Card";
import GoogleMap from "../components/GoogleMap";
import { Helmet } from "react-helmet";
import { IUser } from "../api/@types";
import { Link } from "react-router-dom";
import LoadingSection from "../components/LoadingSection";
import Section from "../components/Section";
import { defaultUser } from "../api/reducer";
import { shuffleArray } from "../api/helper";
import { useContext } from "react";
import useLocalStorage from "../api/useLocalStorage";

function Dashboard() {
  const [user] = useLocalStorage<IUser>("tour-user", defaultUser);
  const {
    state: { places },
  } = useContext(AppContext);
  return (
    <div className="block w-full max-w-screen-desktop mx-auto">
      <Helmet>
        <title>Dashboard | {user.email}</title>
      </Helmet>

      <Section title="My Recent bookings" id="">
        {/* <BookingTable data={bookings} /> */}
        <BookingTable />
        <Link to="/bookings" state={{ location: "The Oaklands" }}>
          <Button className="w-full" gradientDuoTone="greenToBlue">
            See more bookings
          </Button>
        </Link>
      </Section>
      <Section id="places" subtitle="Tourism Centers">
        <LoadingSection />
        <div className="grid sm:grid-cols-2 place-items-center md:grid-cols-2 laptop:grid-cols-3 gap-6">
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
