import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import Section from "../components/Section";
import BreadcrumbComponents from "../components/BreadcrumbComponents";
import BookNowComponent from "../components/BookNowComponent";
import GoogleMap from "../components/GoogleMap";
import { truncateString } from "../api/helper";
import { Button } from "flowbite-react";

function TourPage() {
  const [mainPhoto, setMainPhoto] = useState(0);
  const {
    state: { name = "Enugu", images = [""], about = "" },
  } = useLocation();

  return (
    <div className="mx-auto md:container mt-20">
      <BreadcrumbComponents />
      <Section subtitle={name}>
        <div className="grid gap-4">
          <div className="relative card overflow-hidden">
            <div className="card__overlay w-full flex items-center justify-center">
              <Link to="#book" state={{ name, images, about }}>
                <Button gradientDuoTone="greenToBlue">Book Now</Button>
              </Link>
            </div>
            <img
              className="h-auto max-h-[700px] w-full max-w-full rounded-lg border"
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
              </div>
            ))}
          </div>
        </div>
      </Section>
      <Section title={`About ${name}`}>
        <p className="leading-loose text-justify">
          {truncateString(about, 2000)}
        </p>
      </Section>
      <div className="overflow-auto">
        <GoogleMap withSearch={false} query={name} />
      </div>
      <Section id="book" subtitle="Let's Take You There" title="Book Now">
        <BookNowComponent destination={name} />
      </Section>
    </div>
  );
}

export default TourPage;
