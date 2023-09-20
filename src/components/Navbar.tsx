import { Avatar, Button, Dropdown, Navbar } from "flowbite-react";
import { FaArrowRightFromBracket, FaPlane, FaUser } from "react-icons/fa6";
import { Link, NavLink } from "react-router-dom";
import { Types, defaultUser } from "../api/contexts/reducer";

import { AppContext } from "../api/contexts/context";
import { IUser } from "../api/@types";
import LogoComponent from "./LogoComponent";
import { auth } from "../firebase";
import { useContext } from "react";
import useLocalStorage from "../api/hooks/useLocalStorage";

interface Props {
  links: {
    title: string;
    link: string;
  }[];
}

function NavbarComponent({ links: navLinks }: Props) {
  const [storageUser] = useLocalStorage<IUser>("tour-user", defaultUser);
  const { dispatch } = useContext(AppContext);
  return (
    <div className="tablet:container w-full mx-auto p-4 dark:bg-slate-700 bg-white md:p-6 top-0 rounded-lg shadow-lg overflow-hidden z-[10] md:-my-10">
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
        {!storageUser.email ? (
          <Link
            to="/login"
            className="cursor-pointer -my-1 px-4 md:order-3 order-0"
          >
            <Button gradientDuoTone="greenToBlue">Login</Button>
          </Link>
        ) : (
          <div className="cursor-pointer -my-1 px-4 md:order-3 order-0 ">
            {/* <ThemeToggler /> */}
            <Dropdown
              arrowIcon={false}
              inline
              className="absolute"
              label={
                <Avatar
                  alt="User settings"
                  img={storageUser?.photoURL || ""}
                  rounded
                  placeholderInitials={
                    storageUser?.photoURL ||
                    storageUser?.email?.slice(0, 2).toUpperCase()
                  }
                />
              }
            >
              <Dropdown.Header className="">
                <span className="block font-semibold text-primary">
                  {storageUser?.displayName}
                </span>
                <span className="block truncate text-sm font-medium">
                  {storageUser?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item icon={FaPlane}>
                <Link className="text-sm w-full text-left ml-2" to="/dashboard">
                  Dashboard
                </Link>
              </Dropdown.Item>
              <Dropdown.Item icon={FaUser}>
                <Link className="text-sm w-full text-left ml-2" to="/profile">
                  Profile
                </Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                icon={FaArrowRightFromBracket}
                onClick={() => {
                  dispatch({ type: Types.logout, payload: null });
                  auth.signOut();
                }}
              >
                <Link to="/login">
                  <div className="text-sm w-full text-left ml-2">Sign out</div>
                </Link>
              </Dropdown.Item>
            </Dropdown>
          </div>
        )}
      </Navbar>
    </div>
  );
}

export default NavbarComponent;
