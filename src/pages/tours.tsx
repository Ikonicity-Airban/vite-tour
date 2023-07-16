import { AppContext } from "../api/context";
import { useContext, useState } from "react";
import Section from "../components/Section";
import Heading from "../components/Heading";
import Hr from "../components/HR";
import SearchBar from "../components/SearchBar";
import { IPlace } from "../api/@types";
import LoadingSection from "../components/LoadingSection";
import BreadcrumbComponents from "../components/BreadcrumbComponents";
import { Link } from "react-router-dom";
import { Card } from "flowbite-react";
import { generateRandomNum, shuffleArray } from "../api/helper";
import CardComponent from "../components/Card";

function ToursPages() {
  const {
    state: { places },
  } = useContext(AppContext);

  const [searchResults, setSearchResults] = useState<IPlace[]>(places);

  const handleSearch = (results: IPlace[]) => {
    setSearchResults(results);
  };

  return (
    <div className="md:mt-20 space-y-10 p-4">
      <BreadcrumbComponents />
      <SearchBar
        list={places}
        searchKeys={["name", "about", "tags"]}
        onSearch={handleSearch}
        placeholder="Find a place that suits you"
      />

      <Heading heading="All our tour sites" />
      <Hr />
      <div className="mx-auto">
        <LoadingSection />
      </div>
      {searchResults.length ? (
        shuffleArray(searchResults).map((source) => {
          return (
            <Section subtitle={source.name} key={source.name}>
              <div className="h-52 flex overflow-x-auto overflow-y-clip gap-4 slider snap-x snap-center">
                {source.images?.map((src, idx) => (
                  <Link
                    to={source.name.split(" ").join("-")}
                    key={idx}
                    state={source}
                  >
                    <Card className="h-full w-1/3 min-w-[260px] snap-center object-cover">
                      <img
                        src={src}
                        alt={src}
                        className="block h-full w-full object-bottom"
                      ></img>
                    </Card>
                  </Link>
                ))}
              </div>
            </Section>
          );
        })
      ) : (
        <div className="flex items-center justify-center border-[1px] min-h-[10rem] p-6 border-gray-500 border-dashed ">
          <h4 className="text-primary">No search result yet</h4>
        </div>
      )}
      <Section subtitle="Suggestions">
        <div className="grid-card gap-4">
          {places.length
            ? shuffleArray(places)
                .splice(0, 6)
                .map((source) => (
                  <div className="" key={source.name}>
                    <Link to={source.name.split(" ").join("-")} state={source}>
                      <CardComponent
                        source={{
                          ...source,
                          source:
                            source.images[
                              generateRandomNum(source.images.length)
                            ],
                        }}
                      />
                    </Link>
                  </div>
                ))
            : null}
        </div>
      </Section>
    </div>
  );
}

export default ToursPages;
