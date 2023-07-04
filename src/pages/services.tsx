import React from "react";
import Section from "../components/Section";
import SearchBar from "../components/SearchBar";
import { Card } from "flowbite-react";
import LoadingSection from "../components/LoadingSection";
import CardComponent from "../components/Card";

function ServicesPage() {
  const [services, setServices] = React.useState<string[] | null>();
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    setLoading(false);
    setServices(null);
  }, []);

  const sources = React.useMemo(
    () => [
      "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
    ],
    []
  );
  return (
    <div className="">
      <SearchBar
        list={[]}
        onSearch={() => null}
        searchKeys={["service", "name", "price"]}
      />
      <Section
        id="our-services"
        title="Our services"
        subtitle="Search our services"
      >
        {services?.length ? (
          <div className="grid grid-cols-1 text-center w-full smallscreens:grid-cols-2 md:grid-cols-3 desktop:grid-cols-4 gap-4 justify-center">
            <LoadingSection />
            {services.map((source) => (
              <CardComponent key={source}></CardComponent>
            ))}
          </div>
        ) : (
          <h4 className="w-full text-center">No Services</h4>
        )}
      </Section>
    </div>
  );
}
export default ServicesPage;
