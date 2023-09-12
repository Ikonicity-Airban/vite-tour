import { AppContext } from "../api/context";
import FooterComponent from "../components/Footer";
import Header from "../components/Header";
import { Helmet } from "react-helmet";
import LogoComponent from "../components/LogoComponent";
import { Outlet } from "react-router-dom";
import { useContext } from "react";
import useFetchSites from "../api/fetchCollections";

function MainLayout() {
  const {
    state: { isLoading },
  } = useContext(AppContext);
  useFetchSites();

  return (
    <section className="tablet:px-6 mx-auto">
      <Helmet>
        <title>ESTC |</title>
      </Helmet>
      {isLoading && (
        <div
          className="bg-[#000022d5]
      flex items-center justify-center dark:from-blue-950 w-full h-full fixed inset-0 select-none z-[999]"
        >
          <div className="animate-ping w-fit text-white">
            <LogoComponent />
          </div>
        </div>
      )}
      <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-950 w-full h-full absolute top-0 left-0 -z-[]"></div>
      <Header />
      <div
        className="relative min-h-[80vh]"
        data-testid="flowbite-navbar-toggle"
      >
        <Outlet></Outlet>
      </div>
      <FooterComponent />
    </section>
  );
}

export default MainLayout;
