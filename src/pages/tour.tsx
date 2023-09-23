import {
  BookNowComponent,
  BreadcrumbComponents,
  CardComponent,
  DivScrollToView,
  GoogleMap,
  LoadingSection,
  PremiumCardList,
  Section,
} from "../components";
import { Button, Card } from "flowbite-react";
import { Link, useLocation } from "react-router-dom";
import {
  generateRandomNum,
  scrollIntoView,
  shuffleArray,
  truncateString,
} from "../api/helper";
import { useContext, useState } from "react";

import { AppContext } from "../api/contexts/context";
import { FaHandPointUp } from "react-icons/fa6";
import { Helmet } from "react-helmet";

function TourPage() {
  const [mainPhoto, setMainPhoto] = useState(0);
  const {
    state: { places },
  } = useContext(AppContext);

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
      <Section subtitle={name} id={name} title="the">
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
                {i == mainPhoto && (
                  <div className="relative bg-[#fff] hidden md:block  h-full">
                    <div className="absolute bottom-[100%] left-[30%] flex animate-bounce items-center flex-col text-2xl text-white justify-center">
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
        <Section subtitle={`${name}`} title="more about">
          <p className="leading-loose text-justify">
            {truncateString(about, 2000)}
          </p>
        </Section>
      </DivScrollToView>
      <DivScrollToView>
        <div className="flex gap-10 flex-wrap">
          {Object.entries(
            places.find((place) => place?.name == name)?.others || {}
          ).map(([key, value]) => (
            <Card className="max-w-sm">
              <div className="flex flex-col justify-around gap-6 h-full">
                <h3 className="text-primary">{key}</h3>
                <p className="flex-[1]">{value ?? ""}</p>
              </div>
            </Card>
          ))}
        </div>
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
      <Section subtitle="Suggestions">
        <div className="grid sm:grid-cols-2 laptop:grid-cols-3 gap-4 place-items-center">
          {shuffleArray(places)
            .splice(0, 6)
            .map((source) => (
              <div className="" key={source.name}>
                <Link
                  to={`/tours/${source.name.split(" ").join("-")}`}
                  state={source}
                >
                  <CardComponent
                    source={{
                      ...source,
                      source:
                        source.images[generateRandomNum(source.images.length)],
                    }}
                  />
                </Link>
              </div>
            ))}
        </div>
      </Section>
    </div>
  );
}

export default TourPage;
