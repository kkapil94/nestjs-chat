import { Outlet, createBrowserRouter } from "react-router-dom";
import RoomJoin from "./component/RoomJoin";
import RoomPage from "./component/RoomPage";
import ContextProvider from "./context/context";

const AppLayout = () => (
  <>
    <ContextProvider>
      <Outlet />
    </ContextProvider>
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
