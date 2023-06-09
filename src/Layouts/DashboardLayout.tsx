import React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import LogoComponent from "../components/LogoComponent";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { AppContext } from "../api/context";
import { Types } from "../api/reducer";
import BreadcrumbComponents from "../components/BreadcrumbComponents";
// import Drawer from "../components/Drawer";
import FooterComponent from "../components/Footer";
import useFetchSites from "../api/fetchSites";

function DashboardLayout() {
  const {
    dispatch,
    state: { isLoggedIn, user },
  } = React.useContext(AppContext);
  const navigate = useNavigate();

  // fetching places

  useFetchSites();
  //useEffect
  React.useLayoutEffect(() => {
    dispatch({
      type: Types.setIsLoading,
      payload: true,
    });
    onAuthStateChanged(auth, (userCredentials) => {
      if (userCredentials) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const {
          displayName,
          email,
          emailVerified,
          phoneNumber,
          metadata,
          photoURL,
          refreshToken,
        } = userCredentials;
        dispatch({
          type: Types.login,
          payload: {
            refreshToken,
            user: {
              displayName,
              email,
              emailVerified,
              metadata,
              phoneNumber,
              photoURL,
            },
          },
        });
      } else {
        dispatch({
          type: Types.logout,
          payload: {},
        });

        // navigate("/login");
        console.log("user is logged out");
      }
      dispatch({
        type: Types.setIsLoading,
        payload: false,
      });
    });
  }, [navigate, dispatch]);

  if (isLoggedIn)
    return (
      <div className="w-full relative tablet:px-4">
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
                <span className="block text-sm">{user?.displayName}</span>
                <span className="block truncate text-sm font-medium">
                  {user?.email}
                </span>
              </Dropdown.Header>
              <Dropdown.Item>
                <Link className="text-sm" to="/dashboard">
                  Dashboard
                </Link>
              </Dropdown.Item>
              <Dropdown.Item>
                <Link className="text-sm" to="profile">
                  profile
                </Link>
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  dispatch({ type: Types.logout, payload: null });
                  auth.signOut();
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
          <Outlet></Outlet>
        </section>

        {/* <Drawer /> */}
        <FooterComponent />
      </div>
    );
  else return null;
}

export default DashboardLayout;
