import { TextInput } from "flowbite-react";
import React from "react";
import Section from "../components/Section";
import Card from "../components/Card";

function ServicesPage() {
  const sources = React.useMemo(
    () => [
      "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
    ],
    []
  );
  return (
    <div className="">
      <div className="search-bar max-w-md p-4 mx-auto mt-5">
        <div className="text-ls text-primary font-medium text-center">
          What would you like to find?
        </div>
        <TextInput placeholder="Search" />
      </div>
      <Section
        id="our-services"
        title="Our services"
        subtitle="Search our services"
      >
        <div className="grid grid-cols-1 smallscreens:grid-cols-2 md:grid-cols-3 gap-4">
          {sources.slice(2, 5).map((source) => (
            <Card source={source} key={source} />
          ))}
          {sources.slice(1, 4).map((source) => (
            <Card source={source} key={source} />
          ))}
          {sources.slice(3, 6).map((source) => (
            <Card source={source} key={source} />
          ))}
        </div>
      </Section>
    </div>
  );
}
export default ServicesPage;
