import React, { useState } from "react";
import Fuse from "fuse.js";
import { DebounceInput } from "react-debounce-input";
import { Label } from "flowbite-react";

type ListType = {
  name: string;
  about: string;
  images: string[];
  tags: string;
  id: string;
};

type PropsType = {
  list: ListType[];
  searchKeys: string[];
  placeholder?: string;
  onSearch: (results: ListType[]) => void;
};

const SearchBar: React.FC<PropsType> = ({
  list,
  searchKeys,
  placeholder = "Search",
  onSearch,
}) => {
  const [searchTerm, setSearchTerm] = useState("");

  const fuse = new Fuse(list, {
    keys: searchKeys,
    includeScore: true,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      onSearch([]);
    } else {
      const searchResults = fuse.search(term).map((result) => result.item);
      onSearch(searchResults);
    }
  };

  return (
    <div className="flex items-center justify-end mx-auto container top-10 ">
      <Label className="grid place-items-center p-4">
        <i className="fa fa-search"></i>
      </Label>
      <DebounceInput
        placeholder={placeholder}
        value={searchTerm}
        onChange={handleSearch}
        debounceTimeout={500}
        type="search"
        className="block min-w-[280px]  p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
      />
    </div>
  );
};

export default SearchBar;
