import React from "react";
import CarouselComponent from "../components/Carousel";
import Section from "../components/Section";
import PremiumCard from "../components/PremiumCard";
import Card from "../components/Card";
import BookNowComponent from "../components/BookNowComponent";

function HomePage() {
  const sources = [
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
    "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
  ];

  const formData = React.useMemo(
    () => [
      {
        name: "destination",
        type: "text",
        title: "Destination",
        icon: "fa-solid fa-globe",
      },
      {
        name: "destination",
        type: "text",
        title: "Destination",
        icon: "fa-solid fa-globe",
      },
      {
        name: "destination",
        type: "text",
        title: "Destination",
        icon: "fa-solid fa-globe",
      },
    ],
    []
  );

  return (
    <>
      <CarouselComponent />
      <Section
        id="destination"
        title="destination"
        subtitle="Explore Our Top Sites"
      >
        <div className="grid-card gap-4">
          {sources.map((source) => (
            <Card source={source} key={source} />
          ))}
        </div>
      </Section>
      <Section
        title="our services"
        id="explore"
        subtitle="Tourist Site and Services"
      >
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {sources.map((source) => (
            <Card source={source} key={source} />
          ))}
        </div>
      </Section>
      <Section
        id="tours-packages"
        title="tours packages"
        subtitle="Premium Packages"
      >
        <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-4">
          {sources.slice(2, 5).map((source) => (
            <PremiumCard source={source} key={source} />
          ))}
        </div>
      </Section>
      <Section id="book-now" title="book now" subtitle="Make A Reservation">
        <div className="w-full max-w-3xl mx-auto">
          <BookNowComponent formData={formData} />
        </div>
      </Section>
      <Section
        title="Tour Guides"
        subtitle="Our Amazing Tour Guides"
        id="guides"
      >
        <div className="grid sm:grid-cols-2 md:grid-cols-3 laptop:grid-cols-4 desktop:grid-cols-6 gap-4">
          {sources.map((source) => (
            <Card source={source} key={source} />
          ))}
        </div>
      </Section>
    </>
  );
}

export default HomePage;
