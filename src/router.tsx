import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./pages/index";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import ServicesPage from "./pages/services";
import DashboardLayout from "./Layouts/DashboardLayout";
import Dashboard from "./pages/dashboard";
import AboutPage from "./pages/about";
import ToursPages from "./pages/tours";
import TourPage from "./pages/tour";
import FourOhFour from "./pages/404";

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
            children: [
              {
                path: ":id",
                element: <TourPage />,
              },
            ],
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
        path: "/dashboard",
        element: <DashboardLayout />,
        children: [
          {
            path: "",
            element: <Dashboard />,
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
