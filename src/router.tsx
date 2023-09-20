import AboutPage from "./pages/about";
import AdminDashboard from "./pages/admin/dashboard";
import AdminDashboardLayout from "./Layouts/AdminLayout";
import AdminLoginPage from "./pages/admin/login";
import App from "./App";
import Bookings from "./pages/bookings";
import Dashboard from "./pages/dashboard";
import DashboardLayout from "./Layouts/DashboardLayout";
import FourOhFour from "./pages/404";
import HomePage from "./pages/index";
import LoginPage from "./pages/login";
import MainLayout from "./Layouts/MainLayout";
import ProfilePage from "./pages/profile";
import ServicesPage from "./pages/services";
import SignUpPage from "./pages/signup";
import TourPage from "./pages/tour";
import ToursPages from "./pages/tours";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "/",
        element: <MainLayout />,
        children: [
          {
            path: "/",
            element: <HomePage />,
          },
          {
            path: "/about",
            element: <AboutPage />,
          },
          {
            path: "/services",
            element: <ServicesPage />,
          },
          {
            path: "/tours",
            element: <ToursPages />,
          },
          {
            path: "tours/:id",
            element: <TourPage />,
          },
          {
            path: "/login",
            element: <LoginPage />,
          },
          {
            path: "/create-account",
            element: <SignUpPage />,
          },
        ],
      },
      {
        path: "/admin/login",
        element: <AdminLoginPage />,
      },
      {
        path: "/",
        element: <DashboardLayout />,
        children: [
          {
            path: "dashboard",
            element: <Dashboard />,
          },
          {
            path: "profile",
            element: <ProfilePage />,
          },
          {
            path: "bookings",
            element: <Bookings />,
          },
        ],
      },
      {
        path: "/admin",
        element: <AdminDashboardLayout />,
        children: [
          {
            path: "",
            element: <AdminDashboard />,
          },
          {
            path: "plans",
            element: <ProfilePage />,
          },
          {
            path: "bookings",
            element: <ProfilePage />,
          },
          {
            path: "",
            element: <ProfilePage />,
          },
        ],
      },
    ],
  },
  {
    path: "*",
    element: <FourOhFour />,
  },
]);
