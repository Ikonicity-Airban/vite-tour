import { useEffect, useState } from "react";

import { DarkThemeToggle } from "flowbite-react";

type Theme = "light" | "dark";

const toggleTheme = (currentTheme: Theme): Theme => {
  return currentTheme === "light" ? "dark" : "light";
};

const ThemeToggler = () => {
  const [theme, setTheme] = useState<Theme>("light");

  //selecting the html tag

  useEffect(() => {
    const html = document.querySelector("html") as HTMLHtmlElement;
    html.classList.remove(theme === "light" ? "dark" : "light");
    html.classList.add(theme);
  }, [theme]);

  const handleThemeToggle = () => {
    setTheme(toggleTheme(theme));
  };

  return <DarkThemeToggle onClick={handleThemeToggle} />;
};

export default ThemeToggler;
