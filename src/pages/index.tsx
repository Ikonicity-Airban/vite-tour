import { useContext, useState } from "react";
import CarouselComponent from "../components/Carousel";
import Section from "../components/Section";
import PremiumCard from "../components/PremiumCard";
import Card from "../components/Card";
import BookNowComponent from "../components/BookNowComponent";
import { AppContext } from "../api/context";
import Hr from "../components/HR";
import { Button, Tabs } from "flowbite-react";
import ServicesCard from "../components/ServicesCard";
import { IPlace, IService } from "../api/@types";
import LoadingSection from "../components/LoadingSection";
import { useFetchCollection } from "../api/fetchSites";
import BreadcrumbComponents from "../components/BreadcrumbComponents";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";

function HomePage() {
  const {
    state: { places, carousel },
  } = useContext(AppContext);

  const services: IService[] = [];
  // const services = useFetchCollection<IService>("services");
  const [filtered, setFiltered] = useState<IPlace[]>();

  return (
    <div className="flex flex-col">
      <CarouselComponent sources={carousel} />
      <Hr />
      <BreadcrumbComponents />

      <SearchBar
        list={places}
        onSearch={setFiltered}
        searchKeys={["name", "tags", "about"]}
        placeholder="Quick Search"
      />
      {/* <Tabs.Group
        onActiveTabChange={() => filterBy}
        style="underline"
        className="justify-center h-auto space-x-4 focus:ring-0 overflow-x-auto"
      >
        {["All sites", "Lounge", "Relaxation"].map((item) => (
          // <div className="" key={item} onClick={() => filterBy(item)}>
          <Tabs.Item
            className=" focus:ring-0 border-none px-4
            "
            key={item}
            title={item}
          ></Tabs.Item>
        ))}
      </Tabs.Group> */}
      <div className="md:container mx-auto max-w-screen-desktop">
        <Section
          id="destination"
          title="destination"
          subtitle="Explore Our Top Sites"
        >
          <LoadingSection />
          {filtered?.length ? (
            <div className="grid-card gap-6">
              {filtered.sort().map((source, i) => (
                <Link to={`/tours/${i}`} state={source} key={source.about}>
                  <div
                    className={`${
                      i % 2 == Math.floor(Math.random() * 1) ? "hidden" : ""
                    } lg:block`}
                  >
                    <Card
                      source={source.images[1]}
                      place={source.name}
                      about={source.about}
                    />
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="flex items-center mx-auto container justify-center min-h-[20rem] p-6 border-[1px] rounded-2xl my-10">
              <h5 className="text-red-500">No item matches your search</h5>
            </div>
          )}

          <Link to="/tours">
            <div className="w-full flex justify-center">
              <Button
                // outline
                className="w-full md:w-3/5"
                gradientDuoTone="greenToBlue"
              >
                Browse our full catalogue here
              </Button>
            </div>
          </Link>
        </Section>
        <Hr />

        {/* Services */}
        <Section
          title="our services"
          id="explore"
          subtitle="Tourist Site and Services"
        >
          <div className="mx-auto container">
            {services?.length
              ? services.map((source: IService, i: number) => (
                  <ServicesCard
                    detail={source}
                    position={i % 2 === 0 ? 1 : -1}
                    key={i}
                  />
                ))
              : null}
            <Link to="/services">
              <div className="w-full flex justify-center">
                <Button
                  // outline
                  className="w-full md:w-3/5"
                  gradientDuoTone="greenToBlue"
                >
                  Go to services
                </Button>
              </div>
            </Link>
          </div>
        </Section>
        <Hr />

        {/* Tours Packages */}
        <Section
          id="tours-packages"
          title="tours packages"
          subtitle="Premium Packages"
        >
          <div className="grid sm:grid-cols-2 laptop:grid-cols-3 gap-10 justify-center">
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
            <BookNowComponent destination="" places={places} />
          </div>
        </Section>
      </div>
    </div>
  );
}

export default HomePage;
