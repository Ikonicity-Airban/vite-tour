import "./App.css";

import NetworkStatusIndicator from "./components/NetworkStatusIndicator";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <section className="3xl:container dark:bg-slate-800 mx-auto w-full scroll-section">
      <Toaster />
      <NetworkStatusIndicator />
      <Outlet />
      <ScrollToTop threshold={200} />
    </section>
  );
}

export default App;
