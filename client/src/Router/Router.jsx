import axios from "axios";
import { createBrowserRouter } from "react-router-dom";
import { AppLayout } from "../components/AppLayout";
import ErrorPage from "../pages/ErrorPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import { PrivateRoutes } from "../components/PrivateRoutes";
import { PublicRoutes } from "../components/PublicRoutes";
import AddPlayer from "../pages/AddPlayer";
import PlayerUpdate from "../pages/PlayerUpdate";
import AllPlayers from "../pages/AllPlayers";

const router = createBrowserRouter([
  {
    path: "/",
    element: <AppLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: (
          <PrivateRoutes>
            <AllPlayers />
          </PrivateRoutes>
        ),
        loader: async () =>
          await axios.get(`http://localhost:5000/api/players`),
      },
      {
        path: "/players/create",
        element: (
          <PrivateRoutes>
            <AddPlayer />
          </PrivateRoutes>
        ),
      },
      {
        path: "/players/update/:playerId",
        element: (
          <PrivateRoutes>
            <PlayerUpdate />
          </PrivateRoutes>
        ),
        loader: async ({ params }) =>
          await axios.get(
            `http://localhost:5000/api/players/${params.playerId}`
          ),
      },
      {
        path: "/login",
        element: (
          <PublicRoutes>
            <Login />
          </PublicRoutes>
        ),
      },
      {
        path: "/register",
        element: (
          <PublicRoutes>
            <Register />
          </PublicRoutes>
        ),
      },
    ],
  },
]);

export default router;
