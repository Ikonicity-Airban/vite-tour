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

function ToursPages() {
  const {
    state: { places },
  } = useContext(AppContext);

  const [searchResults, setSearchResults] = useState<IPlace[]>(places);

  const handleSearch = (results: IPlace[]) => {
    setSearchResults(results);
  };

  return (
    <div className="md:mt-20 space-y-10">
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
        searchResults.map((source) => {
          return (
            <Section subtitle={source.name} key={source.name}>
              <div className="min-h-fit flex overflow-x-auto gap-4 snap-x snap-center">
                {source.images?.map((src, i) => (
                  <Card className="w-1/3 min-w-[260px] snap-center">
                    <Link to={i + ""} state={{ source }}>
                      <img
                        src={src}
                        alt={src}
                        className="block h-auto object-cover object-bottom"
                      ></img>
                    </Link>
                  </Card>
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
        <div className="grid">
          {places.length
            ? places.map((source, i) => {
                const randomNum = Math.floor(
                  Math.random() * source.images.length
                );
                return (
                  <div className="" key={source.name}>
                    <Card className="w-1/3 min-w-[260px] snap-center">
                      <Link to={i + 1 + ""} state={{ source }}>
                        <img
                          src={source.images[randomNum]}
                          alt={source.name}
                          className="block h-auto object-cover object-bottom"
                        />
                      </Link>
                    </Card>
                  </div>
                );
              })
            : null}
        </div>
      </Section>
    </div>
  );
}

export default ToursPages;
