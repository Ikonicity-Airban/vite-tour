import { Button, Carousel } from "flowbite-react";
import { ReactNode } from "react";
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
  <div className="text-center min-h-[60vh] h-full w-full object-bottom object-fill ">
    <img src={imgSrc} className="w-full h-full" alt="" />
    <div className="absolute inset-0 bg-[#113a] flex place-content-center">
      <div className="p-3 max-w-[80vw] tablet:max-w-[60vw] place-self-center grid gap-10 md:gap-[10vh]">
        <h4 className="text-white text-base font-bold mb-3 uppercase tablet:text-3xl">
          {title}
        </h4>
        <h1 className="text-white text-3xl laptop:text-7xl font-bold md:mb-4">
          {subtitle}
        </h1>
        <a
          href="#explore"
          className="btn btn-primary mx-auto py-md-3 px-md-5 mt-2"
        >
          {button ?? (
            <Button size="xl" gradientDuoTone="greenToBlue">
              Explore Now
            </Button>
          )}
        </a>
      </div>
    </div>
  </div>
);

function CarouselComponent({ sources }: { sources: string[] }) {
  return (
    <Carousel className="relative bg-slate-600 overflow-hidden rounded-lg min-h-fit order-0">
      {sources.map((src) => (
        <CarouselItem imgSrc={src} key={src} />
      ))}
    </Carousel>
  );
}

export default CarouselComponent;
