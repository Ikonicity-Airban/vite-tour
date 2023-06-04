import { Outlet } from "react-router-dom";
import Header from "../components/Header";

function MainLayout() {
  return (
    <section className="tablet:px-6">
      <Header />
      <Outlet></Outlet>
    </section>
  );
}

export default MainLayout;
