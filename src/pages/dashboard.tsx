import { useContext } from "react";

import CardComponent from "../components/Card";
import Section from "../components/Section";
import { CardSkeleton } from "../components/Skeletons";
import { AppContext } from "../api/context";

function Dashboard() {
  const {
    state: { isLoading, places },
  } = useContext(AppContext);
  return (
    <div className="block w-full mx-auto">
      <Section id="places" subtitle="Tourism Centers">
        {/* <GoogleMap query="Enugu" /> */}

        <div className="grid mobile:grid-cols-2 sm:grid-cols-2 place-items-center md:grid-cols-2 laptop:grid-cols-3 desktop:grid-cols-4 justify-items-stretch gap-6">
          {isLoading
            ? Array(9)
                .fill(null)
                .map((_, i) => <CardSkeleton key={i} />)
            : places.map(({ about, images }) => (
                <CardComponent source={images[0]} key={about} />
              ))}
        </div>
      </Section>
    </div>
  );
}

export default Dashboard;
