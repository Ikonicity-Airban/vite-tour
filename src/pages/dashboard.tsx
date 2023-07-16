import { useContext } from "react";

import CardComponent from "../components/Card";
import Section from "../components/Section";
import { AppContext } from "../api/context";
import GoogleMap from "../components/GoogleMap";
import LoadingSection from "../components/LoadingSection";
import { shuffleArray } from "../api/helper";
import { Link } from "react-router-dom";
import TableComponent from "../components/TableComponent";

function Dashboard() {
  const {
    state: { places },
  } = useContext(AppContext);
  return (
    <div className="block w-full mx-auto">
      <Section>
        <TableComponent />
      </Section>
      <Section id="places" subtitle="Tourism Centers">
        {/* <GoogleMap query="Enugu" /> */}
        <LoadingSection />
        <div className="grid mobile:grid-cols-2 sm:grid-cols-2 place-items-center md:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 justify-items-stretch gap-6">
          {shuffleArray(places).map((source) => (
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
