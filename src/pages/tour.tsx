import { useLocation } from "react-router-dom";
import Section from "../components/Section";

function TourPage() {
  const location = useLocation();
  console.log("🚀 ~ file: tour.tsx:6 ~ TourPage ~ location:", location);
  return (
    <div className="mx-auto md:container">
      <Section title="">
        <div className="">helmet</div>
      </Section>
    </div>
  );
}

export default TourPage;
