import { useContext } from "react";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import FooterComponent from "../components/Footer";
import useFetchSites from "../api/fetchSites";
import { AppContext } from "../api/context";
import LogoComponent from "../components/LogoComponent";
import { Toast } from "flowbite-react";

function MainLayout() {
  const {
    state: { isLoading },
  } = useContext(AppContext);
  useFetchSites();

  return (
    <section className="tablet:px-6 dark:bg-slate-900 mx-auto">
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
      <div className="relative min-h-[80vh]">
        <Outlet></Outlet>
      </div>
      <FooterComponent />
    </section>
  );
}

export default MainLayout;
