import { AppContext } from '../api/context';
import { useContext, useState } from 'react';
import Section from '../components/Section';
import Heading from '../components/Heading';
import Hr from '../components/HR';
import SearchBar from '../components/SearchBar';
import { IPlace } from '../api/@types';
import { Card } from 'flowbite-react';
import { CardSkeleton } from '../components/Skeletons';
import logo from '/carousel/1.jpeg';

function ToursPages() {
    const {
        state: { places },
    } = useContext(AppContext);

    const [searchResults, setSearchResults] = useState<IPlace[]>(places);

    const handleSearch = (results: IPlace[]) => {
        setSearchResults(results);
    };

    return (
        <div>
            <SearchBar
                list={places}
                searchKeys={['name', 'about', 'tags']}
                onSearch={handleSearch}
                placeholder="Find a place"
            />
            <Heading heading="All Our tour sites" section_title="Welcome to TravelEx Catalogue" />
            <Hr />
            {searchResults ? (
                searchResults?.map(({ about, images, tags, name }: IPlace) => {
                    return (
                        <Section subtitle={name}>
                            {
                                <div className="grid-card gap-6">
                                    {images ? (
                                        images.map((image) => (
                                            <Card>
                                                <img src={image || logo} alt="" />
                                                <p>{tags}</p>
                                                <p>{about}</p>
                                            </Card>
                                        ))
                                    ) : (
                                        <CardSkeleton />
                                    )}
                                </div>
                            }
                        </Section>
                    );
                })
            ) : (
                <Card>
                    <Heading
                        heading="No result"
                        section_title="No Item found to match your search"
                    />
                </Card>
            )}
        </div>
    );
}

export default ToursPages;
