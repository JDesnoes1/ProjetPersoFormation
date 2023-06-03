import About from "./pages/APropos/About";
import Formations from "./pages/Formations/Formations";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import FormationDetails from "./pages/FormationDetails/FormationDetails";
import Cours from "./pages/Cours/Cours";
import Navbar from "./composants/Navbar/Navbar";
import Modules from "./pages/ModulesFormations/Modules";
import {
  createBrowserRouter,
  Navigate,
  Outlet,
  RouterProvider,
  useParams,
} from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import LinkPagesFormation from "./composants/LinkPagesFormation/LinkPagesFormation";
import PresentationForm from "./pages/ModulesFormations/PresentationForm";
import Offert from "./pages/ModulesOfferts/Offert";
import { QueryClient, QueryClientProvider } from "react-query";

function App() {
  const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient();

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div>
          <Navbar />
          <div>
            <Outlet />
          </div>
        </div>
      </QueryClientProvider>
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
        {
          path: "/cours/:id",
          element: (
            <ProtectedRoute>
              <PresentationForm />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cours/:formationId/:moduleId",
          element: (
            <ProtectedRoute>
              <Modules />
            </ProtectedRoute>
          ),
        },
        {
          path: "/cours/modulesOfferts",
          element: (
            <ProtectedRoute>
              <Offert />
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
