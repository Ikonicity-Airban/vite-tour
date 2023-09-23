import { AppContext } from "../api/contexts/context";
import { LogoComponent } from ".";
import { useContext } from "react";

function Loading() {
  const {
    state: { isLoading },
  } = useContext(AppContext);

  if (isLoading)
    return (
      <div
        className="bg-[#000022fb]
flex items-center justify-center dark:from-blue-950 w-full h-full fixed inset-0 select-none z-[999999]"
      >
        <div className="animate-ping w-fit text-white">
          <LogoComponent />
        </div>
      </div>
    );
}

export default Loading;
