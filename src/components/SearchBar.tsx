import React, { useState } from 'react';
import Fuse from 'fuse.js';
import { DebounceInput } from 'react-debounce-input';
import { Label } from 'flowbite-react';

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

const SearchBar: React.FC<PropsType> = ({ list, searchKeys, placeholder = 'Search', onSearch }) => {
    const [searchTerm, setSearchTerm] = useState('');

    const fuse = new Fuse(list, {
        keys: searchKeys,
        includeScore: true,
    });

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);

        if (term === '') {
            onSearch([]);
        } else {
            const searchResults = fuse.search(term).map((result) => result.item);
            onSearch(searchResults);
        }
    };

    return (
        <div className="flex items-center justify-end mx-auto mt-20 container sticky top-10  z-20">
            <Label className="grid place-items-center p-4">
                <i className="fa fa-search"></i>
            </Label>
            <DebounceInput
                placeholder={placeholder}
                value={searchTerm}
                onChange={handleSearch}
                debounceTimeout={500}
                type="search"
                className="text-sm h-full border-2 border-primary shadow-sm rounded p-4 w-[300px] max-w-sm outline-none bg-white focus:ring-primary focus:ring-2"
            />
        </div>
    );
};

export default SearchBar;
