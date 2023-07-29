import React from 'react'
import ReactDOM from 'react-dom/client'
import Root from "./routes/root"
import SignUp from "./routes/signup"
import LogIn from "./routes/login"
import "./index.css"

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
)
