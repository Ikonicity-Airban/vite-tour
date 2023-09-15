import { Avatar, Dropdown, Navbar } from "flowbite-react";
import {
  BreadcrumbComponents,
  FooterComponent,
  LogoComponent,
} from "../components";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Types, defaultUser } from "../api/contexts/reducer";

import { AppContext } from "../api/contexts/context";
import { Helmet } from "react-helmet";
import { IUser } from "../api/@types";
import React from "react";
import { auth } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import toast from "react-hot-toast";
import useLocalStorage from "../api/hooks/useLocalStorage";

function AdminDashboardLayout() {
  const { dispatch } = React.useContext(AppContext);

  const navigate = useNavigate();
  const path = useLocation().pathname;
  const [admin, setAdmin] = useLocalStorage<IUser>("tour-admin", defaultUser);

  //useEffect
  React.useLayoutEffect(() => {
    dispatch({
      type: Types.setIsLoading,
      payload: true,
    });

    onAuthStateChanged(auth, (userCredentials) => {
      if (
        userCredentials &&
        [
          "sylva.iyke.si@gmail.com",
          "ikonicityairban@gmail.com",
          "idinmasylvanus@gmail.com",
        ].includes(userCredentials?.email || "")
      ) {
        setAdmin(userCredentials);
      } else {
        dispatch({
          type: Types.logout,
          payload: {},
        });
        navigate("/admin/login");
        toast("Admin is logged out");
      }
      dispatch({
        type: Types.setIsLoading,
        payload: false,
      });
    });
  }, [navigate, dispatch]);

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
                img={admin?.photoURL || ""}
                rounded
                placeholderInitials={
                  admin?.photoURL || admin?.email?.slice(0, 2).toUpperCase()
                }
              />
            }
          >
            <Dropdown.Header>
              <span className="block text-sm font-bold text-primary">
                ADMIN {admin?.displayName}
              </span>
              <span className="block truncate text-sm font-medium">
                {admin?.email}
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
      <div className="mt-20 py-10">
        <BreadcrumbComponents />
      </div>
      <section className=" tablet:px-6 min-h-[70vh]">
        <Outlet />
      </section>

      {/* <Drawer /> */}
      <FooterComponent />
    </div>
  );
}

export default AdminDashboardLayout;
