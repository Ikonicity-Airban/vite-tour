import "./App.css";

import { Loading } from "./components";
import NetworkStatusIndicator from "./components/NetworkStatusIndicator";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./components/ScrollToTop";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <section className="3xl:container dark:bg-slate-800 mx-auto w-full scroll-section relative">
      <Loading />
      <Toaster
        toastOptions={{
          duration: 5000,
        }}
      />
      <NetworkStatusIndicator />
      <Outlet />
      <ScrollToTop threshold={200} />
    </section>
  );
}

export default App;
