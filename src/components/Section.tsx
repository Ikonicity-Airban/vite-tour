import { ReactNode } from "react";
import Heading from "./Heading";

type Props = {
  title?: string;
  subtitle?: string;
  children: ReactNode;
  id?: string;
};

const Section = ({ children, subtitle, id, title, ...props }: Props) => {
  return (
    <section
      className="p-6 flex w-full flex-col place-content-center gap-6 scroll-mt-10 laptop:my-20"
      aria-label={title}
      id={id}
      {...props}
    >
      <Heading section_title={title} heading={subtitle} />
      {children}
    </section>
  );
};

export default Section;
