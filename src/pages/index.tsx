import { useContext, useState } from "react";
import CarouselComponent from "../components/Carousel";
import Section from "../components/Section";
import PremiumCard from "../components/PremiumCard";
import Card from "../components/Card";
import BookNowComponent from "../components/BookNowComponent";
import { AppContext } from "../api/context";
import Hr from "../components/HR";
import { Tabs } from "flowbite-react";
import ServicesCard from "../components/ServicesCard";
import { IPlace } from "../api/@types";
import LoadingSection from "../components/LoadingSection";
import { useFetchCollection } from "../api/fetchSites";
import BreadcrumbComponents from "../components/BreadcrumbComponents";

function HomePage() {
  const {
    state: { places, carousel },
  } = useContext(AppContext);

  const services = useFetchCollection<{
    name: string;
    icon: string;
    desc: string;
  }>("services");
  const [filtered, setFiltered] = useState<IPlace[]>();

  function filterBy(param: string) {
    const newPlaces = places.filter((item) =>
      item.tags.split(",").includes(param)
    );
    setFiltered(newPlaces);
  }

  return (
    <div className="flex flex-col">
      <CarouselComponent sources={carousel} />
      <Hr />
      <BreadcrumbComponents />
      <Tabs.Group
        onActiveTabChange={() => filterBy}
        style="underline"
        className="justify-center space-x-4 focus:ring-0 overflow-x-auto"
      >
        {["All sites", "Lounge", "Relaxation"].map((item) => (
          // <div className="" key={item} onClick={() => filterBy(item)}>
          <Tabs.Item key={item} title={item}></Tabs.Item>
          // </div>
        ))}
      </Tabs.Group>
      <div className="md:container mx-auto max-w-screen-desktop">
        <Section
          id="destination"
          title="destination"
          subtitle="Explore Our Top Sites"
        >
          <LoadingSection />
          <div className="grid-card gap-6">
            {(filtered ? filtered : places)
              .sort()
              .slice(6, 14)
              .map((source, i) => (
                <div className={`${i == 0 || i == 2 ? "hidden" : ""} lg:block`}>
                  <Card
                    source={source.images[1]}
                    place={source.name}
                    key={source.about}
                    about={source.about}
                  />
                </div>
              ))}
          </div>
        </Section>
        <Hr />

        {/* Services */}
        <Section
          title="our services"
          id="explore"
          subtitle="Tourist Site and Services"
        >
          <div className="mx-auto container">
            {services?.length ||
              carousel.map((source, i) => (
                <ServicesCard
                  icon={source}
                  position={i % 2 === 0 ? 1 : -1}
                  key={i}
                  info={""}
                />
              ))}
          </div>
        </Section>
        <Hr />

        {/* Tours Packages */}
        <Section
          id="tours-packages"
          title="tours packages"
          subtitle="Premium Packages"
        >
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-10 justify-center">
            {places
              .sort()
              .slice(8, 14)
              .map((source) => (
                <PremiumCard source={source.images[0]} key={source.about} />
              ))}
          </div>
        </Section>
        <Hr />

        {/* Book now */}
        <Section id="book-now" title="book now" subtitle="Make A Reservation">
          <div className="w-full max-w-3xl mx-auto">
            <BookNowComponent />
          </div>
        </Section>

        {/* Tours and Guides */}
        <Section
          title="Tour Guides"
          subtitle="Our Amazing Tour Guides"
          id="guides"
        >
          <div className="grid sm:grid-cols-2 md:grid-cols-3 laptop:grid-cols-4 gap-4">
            {places
              .sort()
              .slice(8, 14)
              .map((source) => (
                <Card source={source.images[0]} key={source.about} />
              ))}
          </div>
        </Section>
      </div>
    </div>
  );
}

export default HomePage;
