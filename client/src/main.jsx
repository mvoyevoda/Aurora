import ReactDOM from "react-dom/client";
import Dashboard from "./views/Dashboard";
import SignUp from "./views/Signup";
import LogIn from "./views/Login";
import Welcome from "./views/Welcome";
// import App from "./views/Generator";
import Portal from "./views/Portal";
import Configurator from "./views/Configurator";
import ForgotPassword from "./views/ForgotPassword";
import ResetPassword from "./views/ResetPassword";
import "./styles/index.css";
import ProtectedRoute from "./components/ProtectedRoute";
import ErrorPage from "./ErrorPage";

// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthProvider from "./AuthContext";


const router = createBrowserRouter([
  {
    path: "/",
    element: <Welcome />,
  },
  {
    path: "/signup",
    element: <SignUp />,
  },
  {
    path: "/login",
    element: <LogIn />,
  },
  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/generator",
    element: (
      <ProtectedRoute>
        <Configurator />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/portal/:quizId",
    element: (
      <ProtectedRoute>
        <Portal />
      </ProtectedRoute>
    ),
    errorElement: <ErrorPage />,
  },
  {
    path: "/forgotPassword",
    element: <ForgotPassword />,
  },
  {
    path: "/resetPassword/:token",
    element: <ResetPassword />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  // <React.StrictMode>
  <AuthProvider>
    <RouterProvider router={router} />
  </AuthProvider>
  // </React.StrictMode>,
);
