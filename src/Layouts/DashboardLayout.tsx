import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { Types, defaultUser } from "../api/reducer";
import { auth, db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";

import { AppContext } from "../api/context";
import BreadcrumbComponents from "../components/BreadcrumbComponents";
import FooterComponent from "../components/Footer";
import { IUser } from "../api/@types";
import LogoComponent from "../components/LogoComponent";
import React from "react";
import useFetchSites from "../api/fetchCollections";
import useLocalStorage from "../api/useLocalStorage";

// import ThemeToggler from "../components/ToggleTheme";
// import Drawer from "../components/Drawer";

function DashboardLayout() {
  const { dispatch } = React.useContext(AppContext);
  const [user, setUser] = useLocalStorage<IUser>("tour-user", defaultUser);

  const navigate = useNavigate();

  // fetching places
  useFetchSites();

  const UserNavbar = () => (
    <Navbar
      className="w-full py-6 px-4 fixed top-0 left-0 z-[999]"
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
          <Dropdown.Item>
            <Link className="text-sm" to="/dashboard">
              Dashboard
            </Link>
          </Dropdown.Item>
          <Dropdown.Item>
            <Link className="text-sm" to="/profile">
              Profile
            </Link>
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={() => {
              dispatch({ type: Types.logout, payload: null });
              navigate("/login");
              auth.signOut();
            }}
          >
            Sign out
          </Dropdown.Item>
        </Dropdown>
      </div>
    </Navbar>
  );

  //useEffect
  React.useLayoutEffect(() => {
    dispatch({
      type: Types.setIsLoading,
      payload: true,
    });

    if (!user.email) {
      navigate("/login");
      console.log("user is logged out");
      return;
    }
    const getSingleDocument = async () => {
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
    // Usage example
    getSingleDocument();
  }, []);

  if (user?.email)
    return (
      <main className="w-full relative tablet:px-4">
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
