import "./App.css";

import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <section className="3xl:container mx-auto w-full scroll-section">
      <Outlet />
      <ScrollToTop threshold={700} />
    </section>
  );
}

export default App;
