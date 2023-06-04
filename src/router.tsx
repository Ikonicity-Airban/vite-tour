import { createBrowserRouter } from "react-router-dom";
import App from "./App";
import MainLayout from "./Layouts/MainLayout";
import HomePage from "./pages/index";
import LoginPage from "./pages/login";
import SignUpPage from "./pages/signup";
import ServicesPage from "./pages/services";
import DashboardLayout from "./Layouts/DashboardLayout";
import Dashboard from "./pages/dashboard";

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
            element: <HomePage></HomePage>,
          },
          {
            path: "/about",
            element: <HomePage></HomePage>,
          },
          {
            path: "/services",
            element: <ServicesPage></ServicesPage>,
          },
          {
            path: "/packages",
            element: <HomePage></HomePage>,
          },
          {
            path: "/login",
            element: <LoginPage></LoginPage>,
          },
          {
            path: "/create-account",
            element: <SignUpPage></SignUpPage>,
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
]);