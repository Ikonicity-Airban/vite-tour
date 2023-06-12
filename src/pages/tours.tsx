import { AppContext } from "../api/context";
import { useContext, useState } from "react";
import Section from "../components/Section";
import Heading from "../components/Heading";
import Hr from "../components/HR";
import CardComponent from "../components/Card";
import SearchBar from "../components/SearchBar";
import { IPlace } from "../api/@types";

function ToursPages() {
  const {
    state: { places },
  } = useContext(AppContext);

  const [filteredPlaces] = useState(
    []);
  return (

    <div className="md:my-20 md:container mx-auto">
      <SearchBar list={places} />
      <Heading
        heading="All Our tour sites"
        section_title="Welcome to TravelEx Catalogue"
      />
      <Hr />
      {filteredPlaces?.map(({ about, images, tags, name }: IPlace) => {
        return (
          <Section subtitle={name}>
            {
              <div className="grid-card gap-6">
                {images.map((image) => (
                  <CardComponent source={image}>
                    <p>{tags}</p>
                    <p>{about}</p>
                  </CardComponent>
                ))}
              </div>
            }
          </Section>
        );
      })}
    </div>
  );
}

export default ToursPages;
