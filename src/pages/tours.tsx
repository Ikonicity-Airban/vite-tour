import { AppContext } from "../api/context";
import { useContext, useState } from "react";
import Section from "../components/Section";
import Heading from "../components/Heading";
import Hr from "../components/HR";
import SearchBar from "../components/SearchBar";
import { IPlace } from "../api/@types";
import { truncateString } from "../api/helper";
import CardComponent from "../components/Card";
import LoadingSection from "../components/LoadingSection";
import BreadcrumbComponents from "../components/BreadcrumbComponents";
import { Link } from "react-router-dom";

function ToursPages() {
  const {
    state: { places },
  } = useContext(AppContext);

  const [searchResults, setSearchResults] = useState<IPlace[]>(places);

  const handleSearch = (results: IPlace[]) => {
    setSearchResults(results);
  };

  return (
    <div className="md:mt-20 ">
      <BreadcrumbComponents />
      <SearchBar
        list={places}
        searchKeys={["name", "about", "tags"]}
        onSearch={handleSearch}
        placeholder="Find a place"
      />

      <Heading
        heading="All our tour sites"
        section_title="Welcome to TravelEx Catalogue"
      />
      <Hr />
      {places.length ? (
        (searchResults.length ? searchResults : places)?.map(
          ({ about, images, tags, name }: IPlace) => {
            return (
              <Section subtitle={name} key={tags}>
                <LoadingSection />
                {
                  <div className="grid-card gap-6">
                    <div className="">
                      <Link to={name} state={{ about, images, tags, name }}>
                        <CardComponent
                          source={images[0]}
                          about={truncateString(about, 50)}
                        />
                      </Link>
                    </div>
                  </div>
                }
              </Section>
            );
          }
        )
      ) : (
        <div className="flex items-center justify-center p-6">
          <h3>No search result yet</h3>
        </div>
      )}
    </div>
  );
}

export default ToursPages;
