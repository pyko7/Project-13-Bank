import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import LoginPage from "../pages/LoginPage";
import UserPage from "../pages/UserPage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/signin",
    element: <LoginPage />,
  },
  {
    path: "/profile",
    element: <UserPage />,
  },
]);
