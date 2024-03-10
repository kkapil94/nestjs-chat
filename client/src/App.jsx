import { Outlet, createBrowserRouter } from "react-router-dom";
import RoomJoin from "./component/RoomJoin";
import RoomPage from "./component/RoomPage";

const AppLayout = () => (
  <>
    <Outlet />
  </>
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    children: [
      {
        path: "/",
        element: <RoomJoin />,
      },

      {
        path: "/room/:id",
        element: <RoomPage />,
      },
    ],
  },
]);
