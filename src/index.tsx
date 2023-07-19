import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./ux/Layout.tsx";
import Homepage from "./pages/Homepage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";

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
  useQuery<number>(
    ["stEthPrice", "usd"],
    async () => {
      return axios
        .get<{
          ["staked-ether"]: {
            usd: number;
          };
        }>(
          "https://api.coingecko.com/api/v3/simple/price?ids=staked-ether&vs_currencies=usd"
        )
        .then(response => {
          return response.data["staked-ether"].usd;
        });
    },
    {
      refetchInterval: 30000
    }
  );

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
