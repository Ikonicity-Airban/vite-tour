interface IHeadingProps {
  section_title: string;
  heading?: string;
}

function Heading({ heading, section_title }: IHeadingProps) {
  return (
    <div className="text-center font-bold my-6 space-y-2" aria-label="Explore">
      <h1 className="uppercase text-xl text-primary">{section_title}</h1>
      <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
        {heading}
      </h1>
    </div>
  );
}

export default Heading;
