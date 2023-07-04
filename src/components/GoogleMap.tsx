import { Button, Card } from "flowbite-react";
import { ChangeEvent, useState } from "react";
import Section from "./Section";
// import { URLSearchParams } from "url";
import { DebounceInput } from "react-debounce-input";

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

const baseUrl = `https://maps.google.com/maps?width=600&height=400&hl=en&q=Enugu&t=&z=14&ie=UTF8&iwloc=B&output=embed`;
//

// google map search with location completion

//
function GoogleMap({ query = "Enugu", withSearch = true }: Props) {
  const [searchQuery, setQuery] = useState(baseUrl);
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
    <Section id={query} title="google Maps" subtitle="Search For your location">
      <div className="relative h-full grid">
        <Card className="h-fit w-full absolute z-10">
          {withSearch && (
            <form onSubmit={handleSubmit} className="flex gap-4">
              <DebounceInput
                required
                type="search"
                debounceTimeout={500}
                value={locate}
                className="flex-1 ring-1 border-primary rounded px-4 focus:outline-primary"
                onChange={handleChange}
              />
              <Button type="submit">Submit</Button>
            </form>
          )}
          {places && (
            <ul className="w-full space-y-2">
              {places?.map(({ formatted, address_line1 }, i) => (
                <li
                  key={i}
                  className="h-fit bg-[whitesmoke] p-2 rounded cursor-pointer"
                  onClick={() => handleClick(address_line1)}
                >
                  <span className="bg-gray-100 text-[11px]">{formatted}</span>
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card className="w-full flex mt-32">
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
  );
}
/* <style></style> */

export default GoogleMap;
