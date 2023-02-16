import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from "react-router-dom";
import "./index.css";

import Root from "./routes/root";
import Demo1 from "./routes/demo/demo_1";
import Demo2 from "./routes/demo/demo_2";
import Demo3 from "./routes/demo/demo_3";
import Demo4 from "./routes/demo/demo_4";
import Demo5 from "./routes/demo/demo_5";
const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "/demo/demo-1",
    element: <Demo1 />,
  },
  {
    path: "/demo/demo-2",
    element: <Demo2 />,
  },
  {
    path: "/demo/demo-3",
    element: <Demo3 />,
  },
  {
    path: "/demo/demo-4",
    element: <Demo4 />,
  },
  {
    path: "/demo/demo-5",
    element: <Demo5 />,
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);


// ReactDOM.createRoot(document.getElementById('root')).render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>
// )
