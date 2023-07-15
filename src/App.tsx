import { Outlet } from "react-router-dom";
import "./App.css";

function App() {
  return (
    <section className="3xl:container mx-auto w-full">
      <Outlet />
    </section>
  );
}

export default App;
