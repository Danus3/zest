import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./ux/Layout.tsx";
import Homepage from "./pages/Homepage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div>404</div>,
    children: [
      {
        path: "",
        element: <Homepage />
      },
      {
        path: "about",
        element: <div>About</div>
      }
    ]
  }
]);

const App = () => {
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
