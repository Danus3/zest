import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./ux/Layout.tsx";
import Homepage from "./pages/Homepage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSetAtom } from "jotai";
import { adoPriceAtom, aUSDPriceAtm, ethPriceAtom } from "./state";
import Stats from "./pages/Stats";
import { useEffect } from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div className={"text-white text-center"}>404</div>,
    children: [
      {
        path: "",
        element: <Homepage />
      },
      {
        path: "about",
        element: <div>About</div>
      },
      {
        path: "stats",
        element: <Stats />
      }
    ]
  }
]);

const App = () => {
  const setEThPrice = useSetAtom(ethPriceAtom);

  const setAdoPrice = useSetAtom(adoPriceAtom);

  const setAUSDPrice = useSetAtom(aUSDPriceAtm);

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

  useEffect(() => {
    setTimeout(() => {
      setAdoPrice(1.2);
      setAUSDPrice(1.0);
    }, 1000);
  }, [setAdoPrice, setAUSDPrice]);

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
