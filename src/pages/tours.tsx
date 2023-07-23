import { Button, Card } from "flowbite-react";
import { generateRandomNum, shuffleArray } from "../api/helper";
import { useContext, useState } from "react";

import { AppContext } from "../api/context";
import BreadcrumbComponents from "../components/BreadcrumbComponents";
import CardComponent from "../components/Card";
import DivScrollToView from "../components/Framer.div";
import Heading from "../components/Heading";
import { IPlace } from "../api/@types";
import { Link } from "react-router-dom";
import LoadingSection from "../components/LoadingSection";
import { Parallax } from "react-parallax";
import SearchBar from "../components/SearchBar";
import Section from "../components/Section";

function ToursPages() {
  const {
    state: { places },
  } = useContext(AppContext);

  const [searchResults, setSearchResults] = useState<IPlace[]>();
  const [next, setNext] = useState<number>(0);
  const handleSearch = (results: IPlace[]) => {
    setSearchResults(results);
  };

  function handleClick() {
    if (next == places.length) {
      setNext(0);
    } else {
      setNext((prev) => prev + 1);
    }
  }
  return (
    <div className="md:mt-20 space-y-10 p-4">
      <BreadcrumbComponents />
      <SearchBar
        list={places}
        searchKeys={["name", "about", "tags"]}
        onSearch={handleSearch}
        placeholder="Find a place that suits you"
      />

      <Heading heading="All Our Tour Sites" />
      <div className="mx-auto">
        <LoadingSection arrLen={9} />
      </div>
      <Button
        className="animate-bounce fixed bottom-8 z-50"
        onClick={handleClick}
      >
        <a href={`#${next}`}>Scroll to Next</a>
      </Button>
      {places.length ? (
        (searchResults ?? shuffleArray(places)).map((source, i) => {
          return (
            <div className="scroll-section" key={source.name}>
              <Section id={`${i}`}>
                <Parallax
                  bgImage={source.images[0]}
                  blur={5}
                  strength={300}
                  className="rounded-xl"
                >
                  <div className="h-72 md:h-[80vh] p-6 flex items-center justify-center card">
                    <div className="card__overlay"></div>
                    <DivScrollToView>
                      <Heading heading={source.name} />
                    </DivScrollToView>
                  </div>
                </Parallax>
                {source && (
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
                )}
              </Section>
            </div>
          );
        })
      ) : (
        <div className="flex items-center justify-center border-[1px] min-h-[10rem] p-6 border-gray-500 border-dashed ">
          <h3 className="text-primary">Sorry, No result matches your search</h3>
        </div>
      )}
      <Section subtitle="Suggestions" title="">
        <div className="grid-card gap-4 place-items-center">
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
