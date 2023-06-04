import { Navbar } from "flowbite-react";
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
    <div className="md:container w-full mx-auto p-4 bg-white md:p-6 md:relative top-0 rounded-lg shadow overflow-hidden z-10 md:-my-10">
      <Navbar
        fluid
        style={{
          border: "none",
        }}
      >
        <Navbar.Brand>
          <LogoComponent />
        </Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse>
          {navLinks.map(({ link, title }) => (
            <NavLink
              className={({ isActive }) =>
                isActive ? "text-green-700 active-link relative" : ""
              }
              to={link}
              key={title}
            >
              <div id="link">{title}</div>
            </NavLink>
          ))}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}

export default NavbarComponent;

// <Link className="link-button" to="/">Home</Link>
// <Link className="link-button" to="/about">About</Link>
// <Link className="link-button" to="/services">Services</Link>
// <Link className="link-button" to="/products">Products</Link>
