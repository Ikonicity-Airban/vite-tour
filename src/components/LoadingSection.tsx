import { useContext } from "react";
import { AppContext } from "../api/context";
import { CardSkeleton } from "./Skeletons";

const LoadingSection = () => {
  const {
    state: { isLoading },
  } = useContext(AppContext);
  console.log(
    "🚀 ~ file: LoadingSection.tsx:8 ~ LoadingSection ~ isLoading:",
    isLoading
  );

  if (isLoading) {
    return (
      <div className="grid-card justify-center gap-6 w-full">
        {Array(9)
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
