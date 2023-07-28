import { Button, Card } from "flowbite-react";
import { ChangeEvent, useState } from "react";

import { DebounceInput } from "react-debounce-input";
import { FaSearch } from "react-icons/fa";
import Section from "./Section";

// import { URLSearchParams } from "url";

type Props = {
  withSearch?: boolean;
  query?: string;
};

type Places = {
  properties: {
    address_line1: string;
    formatted: string;
    name: string;
    country: string;
  };
};

// google map search with location completion

//
function GoogleMap({ query = "Enugu", withSearch = true }: Props) {
  const [searchQuery, setQuery] = useState(
    `https://maps.google.com/maps?width=600&height=400&hl=en&q=${query}&t=&z=14&ie=UTF8&iwloc=B&output=embed`
  );
  const [locate, setLocate] = useState("");
  const [places, setPlaces] = useState<Places["properties"][]>([]);

  /* geo location getter*/
  const getLocations = async (text: string) => {
    if (!text) return;
    try {
      const requestOptions = {
        method: "GET",
      };
      const response = await fetch(
        `https://api.geoapify.com/v1/geocode/autocomplete?text=${text}&apiKey=1c57a6a14c97478aad78de9a52e4cd66`,
        requestOptions
      );
      return response.json();
    } catch (error) {
      console.log(error);
    }
  };

  /* handle change */
  const handleChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    if (!value) {
      setPlaces([]);
      return;
    }
    setLocate(value);

    const data = await getLocations(value);
    /* destructuring */
    const newArray: Places["properties"][] = [];
    data?.features.map(
      ({ properties: { country, formatted, name, address_line1 } }: Places) => {
        newArray.push({ country, formatted, name, address_line1 });
      }
    );
    setPlaces(newArray);
  };

  //handle submission
  const handleSubmit = (e: ChangeEvent<HTMLFormElement>) => {
    e.preventDefault();
    const url = `https://maps.google.com/maps?width=600&height=400&hl=en&q=${locate}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;
    setQuery(url);
    setPlaces([]);
  };

  const handleClick = (text: string) => {
    setLocate(text);
    const url = `https://maps.google.com/maps?width=600&height=400&hl=en&q=${locate}&t=&z=14&ie=UTF8&iwloc=B&output=embed`;
    setQuery(url);
    setPlaces([]);
  };

  return (
    <div className="overflow-x-auto">
      <Section title="google Maps" subtitle={query}>
        <div className="relative laptop:h-[80vh] grid">
          {withSearch && (
            <div className="relative mb-20">
              <Card className="h-fit w-full mb-20 absolute z-10">
                <form onSubmit={handleSubmit} className="flex gap-4 relative">
                  <FaSearch className="absolute top-2 left-2" />

                  <DebounceInput
                    required
                    type="search"
                    placeholder="Search for any location"
                    debounceTimeout={500}
                    value={locate}
                    className="flex-1 ring-1 border-primary rounded pl-10 focus:outline-primary dark:bg-transparent block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    onChange={handleChange}
                  />
                  <Button type="submit">Submit</Button>
                </form>
                {places && (
                  <ul className="w-full space-y-2 text-primary">
                    {places?.map(({ formatted, address_line1 }, i) => (
                      <li
                        key={i}
                        className="h-fit p-2 pl-6 rounded cursor-pointer bg-[#0001]"
                        onClick={() => handleClick(address_line1)}
                      >
                        <span className="text-[11px]">{formatted}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Card>
            </div>
          )}
          <Card className="w-full flex mt-12">
            <div className="mapouter">
              <div className="gmap_canvas">
                <iframe
                  className="gmap_iframe"
                  allowFullScreen
                  // height="100%"
                  // width="100%"
                  src={searchQuery}
                ></iframe>
                <a href="https://capcuttemplate.org/">Capcuttemplate.org</a>
              </div>
            </div>
          </Card>
        </div>
      </Section>
    </div>
  );
}
/* <style></style> */

export default GoogleMap;
