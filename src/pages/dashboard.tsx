import { useContext } from "react";

import CardComponent from "../components/Card";
import Section from "../components/Section";
import { AppContext } from "../api/context";
import GoogleMap from "../components/GoogleMap";
import LoadingSection from "../components/LoadingSection";

function Dashboard() {
  const {
    state: { places },
  } = useContext(AppContext);
  return (
    <div className="block w-full mx-auto">
      <Section id="places" subtitle="Tourism Centers">
        {/* <GoogleMap query="Enugu" /> */}
        <LoadingSection />
        <div className="grid mobile:grid-cols-2 sm:grid-cols-2 place-items-center md:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 justify-items-stretch gap-6">
          {places.map(({ about, images }) => (
            <CardComponent source={images[0]} key={about} />
          ))}
        </div>
      </Section>
      <GoogleMap withSearch={true} />
    </div>
  );
}

export default Dashboard;
