import { Avatar, Button, Navbar } from "flowbite-react";
import React from "react";
import { Link, NavLink } from "react-router-dom";
import LogoComponent from "./LogoComponent";

function NavbarComponent() {
  const navLinks = React.useMemo(
    () => [
      {
        title: "Home",
        link: "/",
      },
      {
        title: "About",
        link: "/about",
      },
      {
        title: "Tours & Packages",
        link: "/packages",
      },
      {
        title: "Services",
        link: "/services",
      },
    ],
    []
  );

  return (
    <div className="md:container sticky w-full mx-auto p-4 bg-white md:p-6 top-0 rounded-lg shadow-lg overflow-hidden z-10 md:-my-10">
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
        <Navbar.Collapse className="order-3">
          {navLinks.map(({ link, title }) => (
            <NavLink
              className={({ isActive }) =>
                isActive
                  ? "relative text-primary overflow-hidden active-link py-1"
                  : "overflow-hidden relative text-[#11224499] py-1"
              }
              to={link}
              key={title}
            >
              <span className="link">{title}</span>
            </NavLink>
          ))}
        </Navbar.Collapse>
        <Link
          to="/login"
          className="cursor-pointer -my-1 px-4 md:order-3 order-0"
        >
          <Avatar rounded />
        </Link>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
