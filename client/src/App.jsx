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
} from "react-router-dom";
import { useContext, useEffect } from "react";
import { AuthContext } from "./context/authContext";

function App() {
  const { currentUser, logout } = useContext(AuthContext);

  useEffect(() => {
    const checkAccessToken = () => {
      const accessToken = document.cookie.includes("accessToken");

      if (!accessToken) {
        logout(); // Déconnecter l'utilisateur
      }
    };

    checkAccessToken();
  }, []);

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

  const ProtectedRoute = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/connexion" />;
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
