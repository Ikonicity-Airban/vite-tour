import { Button, Card } from "flowbite-react";
import { FaArrowDown, FaArrowUp } from "react-icons/fa";
import { generateRandomNum, scrollIntoView, shuffleArray } from "../api/helper";
import { useContext, useState } from "react";

import { AppContext } from "../api/context";
import BreadcrumbComponents from "../components/BreadcrumbComponents";
import CardComponent from "../components/Card";
import DivScrollToView from "../components/Framer.div";
import Heading from "../components/Heading";
import { Helmet } from "react-helmet";
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

  function handleClick(dir: "next" | "prev") {
    if (next >= (searchResults ?? places).length - 1) {
      setNext(0);
      return;
    } else if (next < 0) {
      setNext((searchResults ?? places).length - 1);
      return;
    } else {
      if (dir == "next") {
        setNext((prev) => prev + 1);
      } else if (dir == "prev") {
        setNext((prev) => prev - 1);
      }
    }

    scrollIntoView("Section" + next);
  }

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
      <div>
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
      </div>
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
                    <div className="card__overlay">
                      <Button
                        pill
                        size="xs"
                        gradientDuoTone="greenToBlue"
                        className="fixed bottom-8 right-[42%] z-50 "
                        onClick={() => handleClick("next")}
                      >
                        Next
                        <FaArrowDown className="ml-4" />
                      </Button>
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
      <Section subtitle="Suggestions" title="">
        <div className="grid-card gap-4 place-items-center">
          <LoadingSection />
          {shuffleArray(places)
            .splice(0, 6)
            .map((source) => (
              <div className="" key={source.name}>
                <Link to={source.name.split(" ").join("-")} state={source}>
                  <CardComponent
                    source={{
                      ...source,
                      source:
                        source.images[generateRandomNum(source.images.length)],
                    }}
                  />
                </Link>
              </div>
            ))}
        </div>
      </Section>
    </div>
  );
}

export default ToursPages;
