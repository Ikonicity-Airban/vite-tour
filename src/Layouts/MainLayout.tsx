import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import FooterComponent from "../components/Footer";
import useFetchSites from "../api/fetchSites";

function MainLayout() {
  useFetchSites();
  return (
    <section className="tablet:px-6">
      <div className=" -z-10 bg-gradient-to-b from-blue-50 to-transparent dark:from-blue-900 w-full h-full absolute top-0 left-0 "></div>
      <Header />

      <Outlet></Outlet>
      <FooterComponent />
    </section>
  );
}

export default MainLayout;
