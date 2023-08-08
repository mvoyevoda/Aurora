import ReactDOM from 'react-dom/client';
import Dashboard from './views/dashboard';
import SignUp from "./views/signup";
import LogIn from "./views/login";
import Welcome from "./views/welcome";
// import App from "./views/Generator";
import Portal from "./components/Portal";
import ForgotPassword from './views/forgotPassword';
import ResetPassword from './views/resetPassword';
import "./styles/index.css";
import ProtectedRoute from './components/ProtectedRoute';
import ErrorPage from './ErrorPage';

// import '@fontsource/roboto/300.css';
// import '@fontsource/roboto/400.css';
// import '@fontsource/roboto/500.css';
// import '@fontsource/roboto/700.css';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import AuthProvider from './contexts/AuthContext';
import Generator from './views/Generator';

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
        <Generator />
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
    element: <ForgotPassword />
  },
  {
    path: "/resetPassword/:token",
    element: <ResetPassword />
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  // <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  // </React.StrictMode>,
);