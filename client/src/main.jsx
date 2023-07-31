import React from 'react';
import ReactDOM from 'react-dom';
import Root from "./routes/root";
import SignUp from "./routes/signup";
import LogIn from "./routes/login";
import "./index.css";
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },{
    path: "/signup",
    element: <SignUp />,
  },{
    path: "/login",
    element: <LogIn />,
  },
]);


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
