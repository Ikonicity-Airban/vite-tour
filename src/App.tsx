import { Outlet } from "react-router-dom";
import "./App.css";
import ScrollToTop from "./components/ScrollToTop";

function App() {
  return (
    <section className="3xl:container mx-auto w-full scroll-section">
      <Outlet />
      <ScrollToTop />
    </section>
  );
}

export default App;
