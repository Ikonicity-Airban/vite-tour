import React from 'react';
import Section from '../components/Section';
import SearchBar from '../components/SearchBar';
import { CardSkeleton } from '../components/Skeletons';
import CardComponent from '../components/Card';
import { Card } from 'flowbite-react';

function ServicesPage() {
    const [services, setServices] = React.useState<string[] | null>();
    const [loading, setLoading] = React.useState(false);

    React.useEffect(() => {
        setLoading(false);
        setServices(null);
    }, []);

    const sources = React.useMemo(
        () => [
            'https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg',
            'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg',
            'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg',
            'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg',
            'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg',
            'https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg',
        ],
        []
    );
    return (
        <div className="">
            <SearchBar list={[]} onSearch={() => null} searchKeys={['service', 'name', 'price']} />
            <Section id="our-services" title="Our services" subtitle="Search our services">
                <div className="grid grid-cols-1 smallscreens:grid-cols-2 md:grid-cols-3 desktop:grid-cols-4 gap-4 justify-center">
                    {loading ? (
                        sources.map((source) => <CardSkeleton key={source}></CardSkeleton>)
                    ) : services?.length ? (
                        services.map((source) => <CardComponent key={source}></CardComponent>)
                    ) : (
                        <Card className="col-span-4 mx-auto">
                            <h4>No Services</h4>
                        </Card>
                    )}
                </div>
            </Section>
        </div>
    );
}
export default ServicesPage;
