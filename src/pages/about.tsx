import { BreadcrumbComponents, GoogleMap } from "../components";

import { Link } from "react-router-dom";

function AboutPage() {
  return (
    <section className="md:mt-20 dark:bg-gray-900 -z-[10] min-h-[80vh]">
      <BreadcrumbComponents />
      <div className="py-8 px-4 mx-auto max-w-screen-xl text-center lg:py-16 z-10 relative">
        <Link
          to="/services"
          className="inline-flex justify-between items-center py-1 px-1 pr-4 mb-7 text-sm text-blue-700 bg-blue-100 rounded-full dark:bg-blue-900 dark:text-blue-300 hover:bg-blue-200 dark:hover:bg-blue-800"
        >
          <span className="text-xs bg-blue-600 rounded-full text-white px-4 py-1.5 mr-3">
            New
          </span>{" "}
          <span className="text-xs md:text-sm font-medium">
            Services was launched! See what's new
          </span>
          <i className="fa fa-angle-right px-2"></i>
        </Link>
        <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
          We tour the world of Enugu state
        </h1>
        <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-16 lg:px-48 dark:text-gray-200">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Culpa
          corporis magni perspiciatis nesciunt animi incidunt sequi
          necessitatibus! Et sequi facilis inventore. Modi nemo error aliquam
          iure commodi incidunt facere autem.
        </p>
        <form
          action="mailto:ikonicityairban@gmail.com"
          className="w-full max-w-md mx-auto"
        >
          <label
            htmlFor="default-email"
            className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
          >
            Email contact
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <i className="fa fa-envelope"></i>
            </div>
            <input
              type="email"
              id="default-email"
              className="block w-full p-4 pl-10 text-sm text-gray-900 border border-gray-300 rounded-lg bg-white focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-800 dark:border-gray-700 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Say something nice..."
              required
            />
            <button
              type="submit"
              className="text-white absolute right-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Contact us
            </button>
          </div>
        </form>
      </div>
      <div className="-mt-32">
        <GoogleMap withSearch={false} />
      </div>
    </section>
  );
}

export default AboutPage;
