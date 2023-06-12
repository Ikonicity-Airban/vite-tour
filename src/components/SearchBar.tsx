import { ChangeEvent, useState } from "react";
import { DebounceInput } from "react-debounce-input";
import Fuse from "fuse.js";
import { Label, Modal } from "flowbite-react";

interface ISearchProps<> {
  list: {
    name: string;
    about: string;
    images: string[];
    tags: string;
    id: string;
  }[]
  state?: [unknown];
  setResult?: [];
}

function SearchBar({ list }: ISearchProps) {
  const [search, setSearch] = useState("");

  function getSearch() {
    const fuse = new Fuse(list, {
      isCaseSensitive: false,
    });
    const result = fuse.search("search");
    console.log("🚀 ~ file: SearchBar.tsx:26 ~ getSearch ~ result:", result)
    // setResult();
  }
  function handleChange(e: ChangeEvent<HTMLInputElement>) {
    setSearch(e.target?.value);
    getSearch();
  }
  return (
    <div className="max-w-md place-self-end flex gap-6 h-10 items-center my-10">
      <Label htmlFor="search" className="font-semibold text-lg text-primary">Search</Label>
      <DebounceInput onChange={handleChange} debounceTimeout={500} type="search" value={search} className="w-full h-full shadow rounded" />
      <Modal>
        Hello
      </Modal>
    </div>
  );
}

export default SearchBar;
