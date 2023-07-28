import { Button, Card } from "flowbite-react";
import { scrollIntoView, truncateString } from "../api/helper";

import BookNowComponent from "../components/BookNowComponent";
import BreadcrumbComponents from "../components/BreadcrumbComponents";
import DivScrollToView from "../components/Framer.div";
import { FaHandPointUp } from "react-icons/fa6";
import GoogleMap from "../components/GoogleMap";
import { Helmet } from "react-helmet";
import PremiumCardList from "../components/PremiumCard";
import Section from "../components/Section";
import { useLocation } from "react-router-dom";
import { useState } from "react";

function TourPage() {
  const [mainPhoto, setMainPhoto] = useState(0);
  const {
    state: { name = "Enugu", images = [""], about = "" },
  } = useLocation();

  return (
    <div className="mx-auto desktop:container mt-20">
      <Helmet>
        <meta name="description" content={truncateString(about, 100)} />
        <title>ESTC | {name}</title>
      </Helmet>
      <BreadcrumbComponents />
      <Section subtitle={name} id={name}>
        <Card className="grid gap-4 overflow-hidden">
          <div className="relative card overflow-hidden">
            <div className="card__overlay w-full flex flex-col p-2 items-center rounded-2xl justify-center">
              <Button
                gradientDuoTone="greenToBlue"
                onClick={() => scrollIntoView("book")}
              >
                Book Now
              </Button>
            </div>
            <img
              className="h-auto max-h-[700px] w-full max-w-full rounded-2xl border"
              src={images[mainPhoto]}
              alt=""
            />
          </div>
          <div className="grid grid-cols-5 gap-4">
            {images.map((src: string, i: number) => (
              <div
                key={src}
                onClick={() => setMainPhoto(i)}
                className="
                max-h-[100px]
                w-full text-sm text-gray-900 border rounded-lg"
              >
                <img
                  className="h-full w-full rounded-lg object-cover"
                  src={src}
                  alt=""
                />
                {i == mainPhoto + 1 && (
                  <div className="relative bg-[#fff] hidden md:block">
                    <div className="absolute bottom-[100%] left-[30%] flex flex-col text-2xl text-white justify-center">
                      <FaHandPointUp />
                      <span className="font-semibold">Click me!</span>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </Card>
      </Section>
      <DivScrollToView>
        <Section title={`About ${name}`}>
          <p className="leading-loose text-justify">
            {truncateString(about, 2000)}
          </p>
        </Section>
      </DivScrollToView>
      <div className="overflow-auto">
        <DivScrollToView>
          <GoogleMap withSearch={false} query={name} />
        </DivScrollToView>
      </div>
      <PremiumCardList />
      <Section id="book" subtitle="Let's Take You There" title="Book Now">
        <BookNowComponent destination={name} />
      </Section>
    </div>
  );
}

export default TourPage;
