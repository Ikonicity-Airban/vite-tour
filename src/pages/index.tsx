import { IPlace, IService } from "../api/@types";
import { useContext, useState } from "react";

import { AppContext } from "../api/context";
import BookNowComponent from "../components/BookNowComponent";
import BreadcrumbComponents from "../components/BreadcrumbComponents";
import { Button } from "flowbite-react";
import CarouselComponent from "../components/Carousel";
import GridInViewAnimation from "../components/Framer.Section";
import Hr from "../components/HR";
import { Link } from "react-router-dom";
import LoadingSection from "../components/LoadingSection";
import PremiumCardList from "../components/PremiumCard";
import SearchBar from "../components/SearchBar";
import Section from "../components/Section";
import ServicesCard from "../components/ServicesCard";
import { shuffleArray } from "../api/helper";
import { useFetchCollection } from "../api/fetchCollections";

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
            <div>
              <GridInViewAnimation
                list={filtered ?? shuffleArray(places)}
              ></GridInViewAnimation>
            </div>
          )}

          <Link to="/tours">
            <div className="w-full flex justify-center animate-bounce my-4">
              <Button
                // outline
                className="w-full md:w-3/5"
                gradientDuoTone="greenToBlue"
              >
                Browse our full catalogue here{" "}
                <i className="fa fa-arrow-right ml-10"></i>
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
