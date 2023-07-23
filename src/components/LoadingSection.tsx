import { AppContext } from "../api/context";
import { CardSkeleton } from "./Skeletons";
import { useContext } from "react";

const LoadingSection = ({ arrLen = 9 }: { arrLen?: number }) => {
  const {
    state: { isLoading },
  } = useContext(AppContext);
  if (isLoading) {
    return (
      <div className="grid-card justify-center gap-6 w-full">
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
