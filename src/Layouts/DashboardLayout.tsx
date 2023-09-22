import { Avatar, Dropdown, Navbar } from "flowbite-react";
import {
  BreadcrumbComponents,
  FooterComponent,
  LogoComponent,
} from "../components";
import { FaArrowRightFromBracket, FaPlane, FaReceipt } from "react-icons/fa6";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { Types, defaultUser } from "../api/contexts/reducer";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import useFetchSites, {
  useFetchSingleDoc,
} from "../api/hooks/fetchCollections";

import { AppContext } from "../api/contexts/context";
import { FaUserEdit } from "react-icons/fa";
import { Helmet } from "react-helmet";
import { IUser } from "../api/@types";
import React from "react";
import useLocalStorage from "../api/hooks/useLocalStorage";

function DashboardLayout() {
  const { dispatch } = React.useContext(AppContext);
  const [storageUser, setUser] = useLocalStorage<IUser>(
    "tour-user",
    defaultUser
  );

  const navigate = useNavigate();
  const pathArray = useLocation().pathname.split("/");

  const { data: user } = useFetchSingleDoc<IUser>(
    "users",
    storageUser?.uid || ""
  );

  // fetching places
  useFetchSites();

  const UserNavbar = () => (
    <Navbar
      className="w-full py-6 px-4 fixed top-0 left-0 z-[99]"
      border
      fluid
      rounded
    >
      <Navbar.Brand>
        <LogoComponent />
      </Navbar.Brand>
      <div className="flex md:order-2 space-x-10 md:mr-10">
        {/* <ThemeToggler /> */}
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              bordered
              alt="User settings"
              img={user?.photoURL || ""}
              rounded
              placeholderInitials={
                user?.photoURL || user?.email?.slice(0, 2).toUpperCase()
              }
            />
          }
        >
          <Dropdown.Header>
            <span className="block font-semibold text-primary">
              {user?.displayName}
            </span>
            <span className="block truncate text-sm font-medium">
              {user?.email}
            </span>
          </Dropdown.Header>
          <Dropdown.Item icon={FaPlane}>
            <Link className="text-sm w-full text-left ml-2" to="/dashboard">
              My Dashboard
            </Link>
          </Dropdown.Item>
          <Dropdown.Item icon={FaReceipt}>
            <Link className="text-sm w-full text-left ml-2" to="/bookings">
              My Bookings
            </Link>
          </Dropdown.Item>
          <Dropdown.Item icon={FaUserEdit}>
            <Link className="text-sm w-full text-left ml-2" to="/profile">
              My Profile
            </Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            icon={FaArrowRightFromBracket}
            onClick={() => {
              dispatch({ type: Types.logout, payload: null });
              auth.signOut();
              navigate("/login");
            }}
          >
            <div className="text-sm w-full text-left ml-2">Sign out</div>
          </Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );

  //useEffect
  React.useEffect(() => {
    if (!storageUser.email) {
      navigate("/login");
      console.log("user is logged out");
      return;
    }
    const checkUser = async () => {
      dispatch({
        type: Types.setIsLoading,
        payload: true,
      });

      try {
        const userRef = doc(db, "users", user?.uid || "");
        const docSnap = await getDoc(userRef);
        if (docSnap.exists()) {
          setUser(docSnap.data());
        } else {
          navigate("/login");

          console.log("user is logged out");
        }
      } catch (error) {
        console.error("Error getting document:", error);
      } finally {
        dispatch({
          type: Types.setIsLoading,
          payload: false,
        });
      }
    };
    checkUser();
  }, []);

  if (user?.email)
    return (
      <main className="w-full relative tablet:px-4">
        <Helmet>
          <title>
            ESTB | {user?.email}{" "}
            {pathArray[1].charAt(0).toUpperCase() + pathArray[1].slice(1)}
          </title>
        </Helmet>
        <UserNavbar />
        <div className="mt-20 pt-10">
          <BreadcrumbComponents />
        </div>
        <section className=" tablet:px-6 min-h-[70vh]">
          <Outlet></Outlet>
        </section>

        {/* <Drawer /> */}
        <FooterComponent />
      </main>
    );
  else return null;
}

export default DashboardLayout;
