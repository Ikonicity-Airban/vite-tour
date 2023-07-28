import { AppContext } from "../api/context";
import { BookNowComponent } from "../components";
import CardComponent from "../components/Card";
import GoogleMap from "../components/GoogleMap";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import LoadingSection from "../components/LoadingSection";
import Section from "../components/Section";
import TableComponent from "../components/TableComponent";
import { shuffleArray } from "../api/helper";
import { useContext } from "react";
import { useQueryCollection } from "../api/fetchCollections";

function Dashboard() {
  const {
    state: { places, user },
  } = useContext(AppContext);
  const bookings = useQueryCollection("bookings", "userId", user.uid);
  return (
    <div className="block w-full mx-auto">
      <Helmet>
        <title>Dashboard | {user.email}</title>
      </Helmet>

      <Section title="Your Recent booking" id="">
        <TableComponent data={bookings} />
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
        <BookNowComponent destination="" places={places} />
      </Section>
      <GoogleMap withSearch={true} />
    </div>
  );
}

export default Dashboard;
