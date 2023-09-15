import {
  BreadcrumbComponents,
  DivScrollToView,
  Heading,
  LoadingSection,
  SearchBar,
  Section,
} from "../components";
import { Button, Card } from "flowbite-react";
import { scrollIntoView, shuffleArray } from "../api/helper";

import { Helmet } from "react-helmet";
import { IPlace } from "../api/@types";
import { Link } from "react-router-dom";
import { Parallax } from "react-parallax";
import { defaultPlace } from "../api/contexts/reducer";
import useLocalStorage from "../api/hooks/useLocalStorage";
import { useState } from "react";

function ToursPages() {
  const [places] = useLocalStorage<IPlace[]>("tour-places", defaultPlace);

  const [searchResults, setSearchResults] = useState<IPlace[]>();
  const handleSearch = (results: IPlace[]) => {
    setSearchResults(results);
  };

  return (
    <div className="md:mt-20 space-y-10 p-4">
      <Helmet>
        <title>ESTC | Tours</title>
      </Helmet>
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
      {/* <div>
        <Button
          pill
          gradientDuoTone="greenToBlue"
          className="fixed bottom-8 left-20 laptop:left-[40%] z-50 bg-[#333366]"
          onClick={() => handleClick("prev")}
        >
          Prev
          <FaArrowUp className="ml-4" />
        </Button>
        <Button
          pill
          gradientDuoTone="greenToBlue"
          className="fixed bottom-8 right-20 laptop:right-[40%] z-50 "
          onClick={() => handleClick("next")}
        >
          <FaArrowDown className="mr-4" />
          Next
        </Button>
      </div> */}
      {places.length ? (
        (searchResults ?? shuffleArray(places)).map((source, i) => {
          return (
            <div className="scroll-section" key={source.name}>
              <Section id={`Section${i}`}>
                <Parallax
                  bgImage={source.images[0]}
                  blur={5}
                  strength={300}
                  className="rounded-xl"
                >
                  <div className="h-72 md:h-[80vh] p-6 flex items-center justify-center card">
                    <div className="card__overlay w-full flex flex-col p-2 items-center rounded-2xl justify-center">
                      <Link
                        to={source.name.split(" ").join("-")}
                        state={source}
                      >
                        <Button
                          gradientDuoTone="greenToBlue"
                          onClick={() => scrollIntoView("book")}
                        >
                          Book Now
                        </Button>
                      </Link>
                    </div>
                    <DivScrollToView>
                      <Heading
                        section_title={source.name}
                        heading={source.name}
                      ></Heading>
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
        <div className="flex items-center justify-center border-[1px] min-h-[10rem] w-full md:mx-auto md:max-w-2xl p-6 border-gray-200  border-dashed ">
          <h3 className="text-primary text-sm md:text-xl">
            Sorry, No result matches your search
          </h3>
        </div>
      )}
    </div>
  );
}

export default ToursPages;
