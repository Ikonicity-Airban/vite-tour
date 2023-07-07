import { useState } from "react";
import { useLocation } from "react-router-dom";
import Section from "../components/Section";
import BreadcrumbComponents from "../components/BreadcrumbComponents";

function TourPage() {
  const [mainPhoto, setMainPhoto] = useState(1);
  const {
    state: { name, images, tags },
  } = useLocation();
  return (
    <div className="mx-auto md:container mt-20">
      <BreadcrumbComponents />
      <Section subtitle={name}>
        <div className="grid gap-4">
          <img
            className="h-auto max-h-[400px] w-full max-w-full rounded-lg border"
            src={images[mainPhoto]}
            alt=""
          />
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
    </div>
  );
}

export default TourPage;
