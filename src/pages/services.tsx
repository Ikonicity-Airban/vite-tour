import { useContext } from "react";
import Section from "../components/Section";
import SearchBar from "../components/SearchBar";
import LoadingSection from "../components/LoadingSection";
import CardComponent from "../components/Card";
import BreadcrumbComponents from "../components/BreadcrumbComponents";
import { useFetchCollection } from "../api/fetchSites";
import { IService } from "../api/@types";
import { AppContext } from "../api/context";

function ServicesPage() {
  const {
    state: { carousel },
  } = useContext(AppContext);
  const services = useFetchCollection<IService>("services");

  return (
    <div className="md:mt-20">
      <BreadcrumbComponents />
      <SearchBar
        list={[]}
        placeholder="Looking for a service?"
        onSearch={() => null}
        searchKeys={["service", "name", "price"]}
      />
      <Section
        id="our-services"
        title="Our services"
        subtitle="Search our services"
      >
        {carousel?.length ? (
          <div className="grid grid-cols-1 text-center w-full smallscreens:grid-cols-2 md:grid-cols-3 desktop:grid-cols-4 gap-4 justify-center">
            <LoadingSection />
            {carousel.map((source, i) => (
              <CardComponent key={i} source={source}></CardComponent>
            ))}
          </div>
        ) : (
          <div className="outline-dashed outline-1 outline-[whitesmoke] shadow-none h-[30vh] mt-10 ">
            <h4 className="w-full text-center">No Services Available</h4>
          </div>
        )}
      </Section>
    </div>
  );
}
export default ServicesPage;
