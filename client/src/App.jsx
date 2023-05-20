import About from "./pages/APropos/About";
import Formations from "./pages/Formations/Formations";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import FormationDetails from "./pages/FormationDetails/FormationDetails";
import Cours from "./pages/Cours/Cours";
import Navbar from "./composants/Navbar/Navbar";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useParams,
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/authContext";
import { AchatContext } from "./context/achatContext";
import LinkPagesFormation from "./composants/LinkPagesFormation/LinkPagesFormation";
import Module1 from "./pages/ModulesFormations/Module1";

function App() {
  const { currentUser } = useContext(AuthContext);
  const { hasFormation } = useContext(AchatContext);

  const Layout = () => {
    return (
      <div>
        <Navbar />
        <div>
          <Outlet />
        </div>
      </div>
    );
  };

  const Layout2 = () => {
    return (
      <div>
        <Navbar />
        <div>
          <LinkPagesFormation />
        </div>
        <div>
          <Outlet />
        </div>
      </div>
    );
  };

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/connexion" />;
    }
    return children;
  };

  const ProtectedRouteFormation = ({ children }) => {
    const params = useParams();
    const formationId = parseInt(params.id);
    if (!hasFormation(formationId)) {
      return <Navigate to="/formations" />;
    }
    return children;
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/formations", element: <Formations /> },
        {
          path: "/cours",
          element: (
            <ProtectedRoute>
              <Cours />
            </ProtectedRoute>
          ),
        },
        {
          path: "/formation/:id",
          element: (
            <ProtectedRoute>
              <FormationDetails />
            </ProtectedRoute>
          ),
        },
        { path: "/about", element: <About /> },
      ],
    },
    {
      path: "/",
      element: <Layout2 />,
      children: [
        {
          path: "/cours/:id",
          element: (
            <ProtectedRoute>
              <ProtectedRouteFormation>
                <Module1 />
              </ProtectedRouteFormation>
            </ProtectedRoute>
          ),
        },
      ],
    },
    { path: "/register", element: <Register /> },
    { path: "/connexion", element: <Login /> },
  ]);
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
