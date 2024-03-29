import {
  BookNowComponent,
  BookingTable,
  CardComponent,
  GoogleMap,
  LoadingSection,
  Section,
} from "../../components";

import { AppContext } from "../../api/contexts/context";
import { Button } from "flowbite-react";
import { Link } from "react-router-dom";
import { shuffleArray } from "../../api/helper";
import { useContext } from "react";

function Dashboard() {
  const {
    state: { places },
  } = useContext(AppContext);
  return (
    <div className="block w-full max-w-screen-desktop mx-auto">
      <Section
        title="My Recent bookings"
        subtitle="View, Edit and Delete your bookings"
      >
        {/* <BookingTable data={bookings} /> */}
        <BookingTable />
        <Link to="/bookings">
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
