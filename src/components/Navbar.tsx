import { Button, Navbar } from "flowbite-react";
import { Link, NavLink } from "react-router-dom";

import LogoComponent from "./LogoComponent";

interface Props {
  links: {
    title: string;
    link: string;
  }[];
}
function NavbarComponent({ links: navLinks }: Props) {
  return (
    <div className="md:container sticky w-full mx-auto p-4 dark:bg-slate-700 bg-white md:p-6 top-0 rounded-lg shadow-lg overflow-hidden z-[10] md:-my-10">
      <Navbar
        fluid
        style={{
          border: "none",
        }}
      >
        <Navbar.Brand className="flex-1 items-end" href="/">
          <LogoComponent />
        </Navbar.Brand>
        <Navbar.Toggle className="order-2" />
        <Navbar.Collapse className="order-3 space-x-4 mr-4 ">
          {navLinks.map(({ link, title }) => (
            <div className="flex justify-center" key={title}>
              <NavLink
                className={({ isActive }) =>
                  isActive
                    ? "relative  dark:text-white text-primary overflow-hidden active-link py-1"
                    : "overflow-hidden relative text-[#11224499] dark:text-white py-1"
                }
                to={link}
              >
                <span className="link">{title}</span>
              </NavLink>
            </div>
          ))}
        </Navbar.Collapse>
        <Link
          to="/login"
          className="cursor-pointer -my-1 px-4 md:order-3 order-0"
        >
          <Button gradientDuoTone="greenToBlue">Login</Button>
        </Link>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
