import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Avatar, Breadcrumb, Dropdown, Navbar } from "flowbite-react";
import LogoComponent from "../components/LogoComponent";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { AppContext } from "../api/context";
import { Types } from "../api/reducer";
import Heading from "../components/Heading";

function DashboardLayout() {
  const {
    dispatch,
    state: { user },
  } = React.useContext(AppContext);
  const navigate = useNavigate();

  const path = useLocation().pathname.split("/")[1];

  //useEffect
  React.useEffect(() => {
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
        // User is signed out
        // ...
        dispatch({
          type: Types.logout,
          payload: {},
        });
        console.log(userCredentials);
        navigate("/login", {
          replace: true,
        });
        console.log("user is logged out");
      }
    });
  }, [navigate, dispatch]);

  if (user)
    return (
      <div className="w-full">
        <Navbar className="w-full" fluid>
          <Navbar.Brand>
            <Navbar.Toggle />
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
              <Dropdown.Item>Dashboard</Dropdown.Item>
              <Dropdown.Item>Settings</Dropdown.Item>
              <Dropdown.Item>Earnings</Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={() => {
                  auth.signOut();
                  dispatch({ type: Types.logout, payload: null });
                }}
              >
                Sign out
              </Dropdown.Item>
            </Dropdown>
          </div>
        </Navbar>
        <Breadcrumb className="p-6 capitalize">
          <Breadcrumb.Item>
            <span className="fa-home">Home</span>
          </Breadcrumb.Item>
          <Breadcrumb.Item>{path}</Breadcrumb.Item>
        </Breadcrumb>
        <section className="space-y-10 p-6">
          <Heading section_title={path} />
          <Outlet></Outlet>
        </section>
      </div>
    );
  else return <center>Loading...</center>;
}

export default DashboardLayout;
