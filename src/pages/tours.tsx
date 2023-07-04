import { AppContext } from "../api/context";
import { useContext, useRef, useState } from "react";
import Section from "../components/Section";
import Heading from "../components/Heading";
import Hr from "../components/HR";
import SearchBar from "../components/SearchBar";
import { IPlace } from "../api/@types";
import { Card } from "flowbite-react";
import { CardSkeleton } from "../components/Skeletons";
import { truncateString } from "../api/helper";
import CardComponent from "../components/Card";
import LoadingSection from "../components/LoadingSection";

function ToursPages() {
  const {
    state: { places },
  } = useContext(AppContext);

  const ref = useRef(null);
  const [searchResults, setSearchResults] = useState<IPlace[]>(places);

  const handleSearch = (results: IPlace[]) => {
    setSearchResults(results);
  };

  return (
    <div className="container mx-auto">
      <SearchBar
        list={places}
        searchKeys={["name", "about", "tags"]}
        onSearch={handleSearch}
        placeholder="Find a place"
      />

      <Heading
        heading="All Our tour sites"
        section_title="Welcome to TravelEx Catalogue"
      />
      <Hr />
      {searchResults ? (
        searchResults?.map(({ about, images, tags, name }: IPlace) => {
          return (
            <Section subtitle={name}>
              {
                <div className="grid-card gap-6">
                  {images ? (
                    images.map((image) => (
                      <div className="" key={image}>
                        <CardComponent
                          source={image}
                          about={truncateString(about, 50)}
                        />
                      </div>
                    ))
                  ) : (
                    <CardSkeleton />
                  )}
                </div>
              }
            </Section>
          );
        })
      ) : (
        <LoadingSection />
      )}
    </div>
  );
}

export default ToursPages;
