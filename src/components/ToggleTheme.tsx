import { Dispatch, SetStateAction, useEffect } from "react";

import { DarkThemeToggle } from "flowbite-react";

interface Props<T> {
  isDarkMode: T;
  setIsDarkMode: Dispatch<SetStateAction<T>>;
}
const ThemeToggler = ({ isDarkMode, setIsDarkMode }: Props<boolean>) => {
  //selecting the html tag
  useEffect(() => {
    // Check if the user prefers a dark color scheme
    if (
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
    ) {
      document.body.className = "dark";
      setIsDarkMode(true);
    }

    // Listen for changes to the user's preferred color scheme
    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = () => {
      setIsDarkMode(mediaQuery.matches);
    };
    mediaQuery.addEventListener("change", handleChange);
    return () => {
      mediaQuery.removeEventListener("change", handleChange);
    };
  }, [setIsDarkMode]);

  const handleThemeToggle = () => {
    setIsDarkMode(!isDarkMode);
  };

  return <DarkThemeToggle onClick={handleThemeToggle} />;
};

export default ThemeToggler;
