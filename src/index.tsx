import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./ux/Layout.tsx";
import Homepage from "./pages/Homepage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSetAtom } from "jotai";
import { ethPriceAtom } from "./state";

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
  const setEThPrice = useSetAtom(ethPriceAtom);

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
          const stEthPrice = response.data["staked-ether"].usd || 0;
          setEThPrice(stEthPrice);
          return stEthPrice;
        });
    },
    {
      refetchInterval: 30000
    }
  );
  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
