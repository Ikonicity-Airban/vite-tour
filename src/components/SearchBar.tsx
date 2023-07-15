import React, { FormEvent, useState } from "react";
import Fuse from "fuse.js";
import { DebounceInput } from "react-debounce-input";

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
    threshold: 0.3,
  });

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value;
    setSearchTerm(term);

    if (term === "") {
      onSearch(list);
    } else {
      const searchResults = fuse.search(term).map((result) => result.item);
      onSearch(searchResults);
    }
  };

  function handleSubmit(evt: FormEvent<HTMLFormElement>) {
    evt.preventDefault();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="flex items-center justify-end mx-auto container "
    >
      <div className="relative max-w-xl w-full">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
          <svg
            className="w-4 h-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 20"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
            />
          </svg>
        </div>

        <DebounceInput
          placeholder={placeholder}
          value={searchTerm}
          onChange={handleSearch}
          debounceTimeout={500}
          type="search"
          className="block w-full p-4 pl-10 outline-primary text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
        />
      </div>
    </form>
  );
};

export default SearchBar;
