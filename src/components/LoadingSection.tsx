import { AppContext } from "../api/contexts/context";
import { CardSkeleton } from "./Skeletons";
import { useContext } from "react";

const LoadingSection = ({ arrLen = 9 }: { arrLen?: number }) => {
  const {
    state: { isLoading },
  } = useContext(AppContext);
  if (isLoading) {
    return (
      <div className="grid sm:grid-cols-2 laptop:grid-cols-3 justify-center gap-6 w-full">
        {Array(arrLen)
          .fill(null)
          .map((_, i) => (
            <CardSkeleton key={i} />
          ))}
      </div>
    );
  }
  return null;
};

export default LoadingSection;
