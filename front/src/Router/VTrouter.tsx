import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Login from "../Login";
import Tasks from "../Tasks";
import LoginCon from "../Login/LoginCon";
import SignupCon from "../Login/SignupCon";
import Notfound from "./Notfound";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Notfound />,
    children: [
      {
        path: "",
        element: <Login />,
        children: [
          {
            path: "/login",
            element: <LoginCon />,
            index: true,
          },
          {
            path: "/signup",
            element: <SignupCon />,
          },
        ],
      },
      {
        path: "/tasks",
        element: <Tasks />,
      },
    ],
  },
]);
