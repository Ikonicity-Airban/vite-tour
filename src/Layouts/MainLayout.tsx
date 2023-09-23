import { FooterComponent} from "../components";

import Header from "../components/Header";
import { Helmet } from "react-helmet";
import { Outlet } from "react-router-dom";
import useFetchSites from "../api/hooks/fetchCollections";

function MainLayout() {
  useFetchSites();

  return (
    <section className="tablet:px-6 mx-auto">
      <Helmet>
        <title>ESTC | A Home for all Tourists</title>
      </Helmet>
      <div className="bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-950 w-full h-full absolute top-0 left-0 -z-[]"></div>
      <Header />
      <div
        className="relative min-h-[80vh]"
        data-testid="flowbite-navbar-toggle"
      >
        <Outlet />
      </div>
      <FooterComponent />
    </section>
  );
}

export default MainLayout;
