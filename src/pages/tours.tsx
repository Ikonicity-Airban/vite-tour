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
import { Carousel } from "flowbite-react";

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
        placeholder="Find a place"
      />

      <Heading heading="All our tour sites" />
      <Hr />
      <div className="mx-auto">
        <LoadingSection />
      </div>
      {searchResults.length ? (
        searchResults.map(({ about, images, tags, name }: IPlace) => {
          console.log(
            "🚀 ~ file: tours.tsx:43 ~ searchResults.map ~ images:",
            images
          );
          return (
            <Section subtitle={name} key={about}>
              {/* <Link to={name} state={{ about, images, tags, name }}> */}

              <div
                id="custom-controls-gallery"
                className="relative w-full"
                data-carousel="slide"
              >
                <div className="relative border h-56 overflow-hidden rounded-lg md:h-96">
                  <div
                    className="hidden duration-700 ease-in-out text-center min-h-[60vh] h-full w-full object-bottom object-fill "
                    data-carousel-item
                  >
                    <img
                      src={images[0]}
                      className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      alt=""
                    />
                  </div>
                  <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item="active"
                  >
                    <img
                      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg"
                      className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      alt=""
                    />
                  </div>
                  <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                  >
                    <img
                      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg"
                      className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      alt=""
                    />
                  </div>
                  <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                  >
                    <img
                      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg"
                      className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      alt=""
                    />
                  </div>
                  <div
                    className="hidden duration-700 ease-in-out"
                    data-carousel-item
                  >
                    <img
                      src="https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg"
                      className="absolute block max-w-full h-auto -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
                      alt=""
                    />
                  </div>
                </div>
                <div className="flex justify-center items-center pt-4">
                  <button
                    type="button"
                    className="flex justify-center items-center mr-4 h-full cursor-pointer group focus:outline-none"
                    data-carousel-prev
                  >
                    <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M13 5H1m0 0 4 4M1 5l4-4"
                        />
                      </svg>
                      <span className="sr-only">Previous</span>
                    </span>
                  </button>
                  <button
                    type="button"
                    className="flex justify-center items-center h-full cursor-pointer group focus:outline-none"
                    data-carousel-next
                  >
                    <span className="text-gray-400 hover:text-gray-900 dark:hover:text-white group-focus:text-gray-900 dark:group-focus:text-white">
                      <svg
                        className="w-5 h-5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 14 10"
                      >
                        <path
                          stroke="currentColor"
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          stroke-width="2"
                          d="M1 5h12m0 0L9 1m4 4L9 9"
                        />
                      </svg>
                      <span className="sr-only">Next</span>
                    </span>
                  </button>
                </div>
              </div>

              {/* </Link> */}
            </Section>
          );
        })
      ) : (
        <div className="flex items-center justify-center p-6">
          <h3>No search result yet</h3>
        </div>
      )}
    </div>
  );
}

export default ToursPages;
