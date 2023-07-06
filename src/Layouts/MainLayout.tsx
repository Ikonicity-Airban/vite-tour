import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import FooterComponent from "../components/Footer";
import useFetchSites from "../api/fetchSites";

function MainLayout() {
  useFetchSites();
  return (
    <section className="tablet:px-6 dark:bg-slate-900 desktop:container mx-auto">
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
