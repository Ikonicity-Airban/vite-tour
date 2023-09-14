import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Types, defaultUser } from "../api/reducer";

import { AppContext } from "../api/context";
import BreadcrumbComponents from "../components/BreadcrumbComponents";
import FooterComponent from "../components/Footer";
import { Helmet } from "react-helmet";
import { IUser } from "../api/@types";
import LogoComponent from "../components/LogoComponent";
import React from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import useFetchSites from "../api/fetchCollections";
import useLocalStorage from "../api/useLocalStorage";

// import Drawer from "../components/Drawer";

function AdminDashboardLayout() {
  const {
    dispatch,
    state: { isLoggedIn },
  } = React.useContext(AppContext);
  const navigate = useNavigate();
  const path = useLocation().pathname;
  const [user, setUser] = useLocalStorage<IUser>("tour-admin", defaultUser);

  // fetching places
  useFetchSites();

  //useEffect
  React.useLayoutEffect(() => {
    dispatch({
      type: Types.setIsLoading,
      payload: true,
    });
    onAuthStateChanged(auth, (userCredentials) => {
      if (
        userCredentials &&
        userCredentials.email !== "sylva.iyke.si@gmail.com" &&
        userCredentials.email !== "ikonicityairban@gmail.com" &&
        userCredentials.email !== "idinmaslyvanus@gmail.com"
      ) {
        setUser(userCredentials);
      } else {
        dispatch({
          type: Types.logout,
          payload: {},
        });

        // navigate("/admin/login");
        console.log("user is logged out");
      }
      dispatch({
        type: Types.setIsLoading,
        payload: false,
      });
    });
  }, [navigate, dispatch]);

  if (!isLoggedIn)
    return (
      <div className="w-full bg-inherit relative tablet:px-4">
        <Helmet>
          <title className="capitalize">Admin | {path.split("/")[1]}</title>
        </Helmet>
        <Navbar
          className="w-full py-6 px-4 fixed top-0 left-0 z-[999]"
          border
          fluid
          rounded
        >
          <Navbar.Brand>
            <Navbar.Toggle className="mr-3" />
            <LogoComponent />
          </Navbar.Brand>
          <div className="text-xl space-x-1 font-semibold">
            <span>ADMIN</span>
            <span>DASHBOARD</span>
          </div>
          <div className="flex md:order-2">
            <Dropdown
              arrowIcon={false}
              inline
              label={
                <Avatar
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
                <span className="block text-sm font-bold text-primary">
                  ADMIN {user?.displayName}
                </span>
                <span className="block truncate text-sm font-medium">
                  {user?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  dispatch({ type: Types.logout, payload: null });
                  auth.signOut();
                  navigate("login");
                }}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </div>
        </Navbar>
        <div className="mt-24">
          <BreadcrumbComponents />
        </div>
        <section className=" tablet:px-6 min-h-[70vh]">
          <Outlet />
        </section>

        {/* <Drawer /> */}
        <FooterComponent />
      </div>
    );
  else return null;
}

export default AdminDashboardLayout;
