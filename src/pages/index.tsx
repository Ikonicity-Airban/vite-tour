import { useContext, useState } from "react";
import CarouselComponent from "../components/Carousel";
import Section from "../components/Section";
import Card from "../components/Card";
import BookNowComponent from "../components/BookNowComponent";
import { AppContext } from "../api/context";
import Hr from "../components/HR";
import { Button } from "flowbite-react";
import ServicesCard from "../components/ServicesCard";
import { IPlace, IService } from "../api/@types";
import LoadingSection from "../components/LoadingSection";
import BreadcrumbComponents from "../components/BreadcrumbComponents";
import { Link } from "react-router-dom";
import SearchBar from "../components/SearchBar";
import { shuffleArray } from "../api/helper";
import { useFetchCollection } from "../api/fetchSites";
import PremiumCardList from "../components/PremiumCard";

function HomePage() {
  const {
    state: { places, carousel },
  } = useContext(AppContext);

  // const services: IService[] = [];
  const services = useFetchCollection<IService>("services");
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

      <div className="md:container mx-auto max-w-screen-desktop">
        <Section
          id="destination"
          title="destination"
          subtitle="Explore Our Top Sites"
        >
          <LoadingSection />
          {places.length && (
            <div className="grid-card gap-6">
              {(filtered ?? places).sort().map((source, i) => (
                <Link
                  to={`/tours/${source.name.split(" ").join("-")}`}
                  state={source}
                  key={source.about}
                >
                  <div
                    className={`${
                      i % 2 == Math.floor(Math.random() * 1) ? "hidden" : ""
                    } lg:block`}
                  >
                    <Card
                      source={{
                        ...source,
                        source: shuffleArray(source.images)[0],
                      }}
                    />
                  </div>
                </Link>
              ))}
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
        <PremiumCardList />
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
