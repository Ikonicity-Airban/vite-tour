import { Button, Carousel } from "flowbite-react";
import { ReactNode, useMemo } from "react";
interface ICCProps {
  title?: string;
  subtitle?: string;
  button?: ReactNode;
  imgSrc: string;
}

const CarouselItem = ({
  title = "Tours & Travel",
  subtitle = "Discover Amazing Places In Enugu State",
  button,
  imgSrc,
}: ICCProps) => (
  <div className="text-center  h-full w-full">
    <img
      src={imgSrc}
      className="absolute block max-w-full h-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
      alt=""
    />
    <div className="absolute inset-0 bg-[#0027] flex place-content-center">
      <div className="p-3 max-w-[60vw] place-self-center grid gap-6">
        <h4 className="text-white font-bold mb-3 uppercase text-3xl">
          {title}
        </h4>
        <h1 className="text-white tablet:text-4xl laptop:text-7xl font-bold mb-4">
          {subtitle}
        </h1>
        <a
          href="#explore"
          className="btn btn-primary mx-auto py-md-3 px-md-5 mt-2"
        >
          {button ?? <Button>Explore Now</Button>}
        </a>
      </div>
    </div>
  </div>
);

function CarouselComponent() {
  const sources = useMemo(
    () => [
      "https://flowbite.s3.amazonaws.com/docs/gallery/square/image.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-1.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-2.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-3.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-4.jpg",
      "https://flowbite.s3.amazonaws.com/docs/gallery/square/image-5.jpg",
    ],
    []
  );

  return (
    <Carousel className="relative mt-28 md:mt-0 overflow-hidden rounded-lg min-h-[70vh]">
      {sources.map((src) => (
        <CarouselItem imgSrc={src} key={src} />
      ))}
    </Carousel>
  );
}

export default CarouselComponent;
