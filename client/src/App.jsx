import About from "./pages/APropos/About";
import Formations from "./pages/Formations/Formations";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import FormationDetails from "./pages/FormationDetails/FormationDetails";
import Navbar from "./composants/Navbar/Navbar";
import { createBrowserRouter, Outlet, RouterProvider } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "./context/authContext";

function App() {
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

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        { path: "/", element: <Home /> },
        { path: "/formations", element: <Formations /> },
        { path: "/formation/:id", element: <FormationDetails /> },
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
