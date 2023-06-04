import { ReactNode } from "react";

interface ICardProps {
  heading?: string;
  source?: string;
  children?: ReactNode;
}

function Card({ heading, source, children }: ICardProps) {
  return (
    <a
      href="/login"
      className="card relative h-auto cursor-pointer overflow-hidden rounded-lg shadow-md text-center"
    >
      <div className="card__overlay absolute inset-0 bg-red-400 w-full h-full translate-y-full transition-transform">
        {children}
      </div>
      <img className="" src={source || "img/package-1.jpg"} alt="" />

      <div className="p-6">
        <h4 className="font-semibold dark:text-white">
          {heading || "Some Heading"}
        </h4>
      </div>
    </a>
  );
}

export default Card;
