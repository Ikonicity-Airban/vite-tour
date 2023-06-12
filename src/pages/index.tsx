import { useContext } from "react";
import CarouselComponent from "../components/Carousel";
import Section from "../components/Section";
import PremiumCard from "../components/PremiumCard";
import Card from "../components/Card";
import BookNowComponent from "../components/BookNowComponent";
import { AppContext } from "../api/context";
import Hr from "../components/HR";

function HomePage() {
  const {
    state: { places, carousel },
  } = useContext(AppContext);



  return (
    <>
      <CarouselComponent sources={carousel} />
      <Hr />
      <div className="md:container mx-auto">
        <Section
          id="destination"
          title="destination"
          subtitle="Explore Our Top Sites"
        >
          <div className="grid-card gap-6">
            {places
              .sort()
              .slice(8, 14)
              .map((source) => (
                <Card source={source.images[0]} key={source.about} />
              ))}
          </div>
        </Section>
        <Hr />
        <Section
          title="our services"
          id="explore"
          subtitle="Tourist Site and Services"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-10">
            {places
              .sort()
              .slice(8, 14)
              .map((source) => (
                <Card source={source.images[0]} key={source.about} />
              ))}
          </div>
        </Section>
        <Hr />
        <Section
          id="tours-packages"
          title="tours packages"
          subtitle="Premium Packages"
        >
          <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
            {places
              .sort()
              .slice(8, 14)
              .map((source) => (
                <PremiumCard source={source.images[0]} key={source.about} />
              ))}
          </div>
        </Section>
        <Hr />
        <Section id="book-now" title="book now" subtitle="Make A Reservation">
          <div className="w-full max-w-3xl mx-auto">
            <BookNowComponent />
          </div>
        </Section>
        <Section
          title="Tour Guides"
          subtitle="Our Amazing Tour Guides"
          id="guides"
        >
          <div className="grid sm:grid-cols-2 md:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 gap-4">
            {places
              .sort()
              .slice(8, 14)
              .map((source) => (
                <Card source={source.images[0]} key={source.about} />
              ))}
          </div>
        </Section>
      </div>
    </>
  );
}

export default HomePage;
