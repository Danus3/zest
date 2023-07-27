import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./ux/Layout.tsx";
import Homepage from "./pages/Homepage";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSetAtom } from "jotai";
import {
  adoPriceAtom,
  aUSDPriceAtm,
  getSTETHPoolStats,
  stEtherPriceAtom
} from "./state";
import Stats from "./pages/Stats";
import { useEffect } from "react";
import MintAndRedeem from "./pages/MintAndRedeem";
import { useToken } from "wagmi";
import Earn from "./pages/Earn";

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
        path: "mint-redeem",
        element: <MintAndRedeem />
      },
      {
        path: "stats",
        element: <Stats />
      },
      {
        path: "earn",
        element: <Earn />
      }
    ]
  }
]);

const App = () => {
  const setEThPrice = useSetAtom(stEtherPriceAtom);

  const setAdoPrice = useSetAtom(adoPriceAtom);

  const setAUSDPrice = useSetAtom(aUSDPriceAtm);

  const setPoolState = useSetAtom(getSTETHPoolStats);

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

  const { data } = useToken({
    address: "0xfB7B4564402E5500dB5bB6d63Ae671302777C75a"
  });

  if (data?.totalSupply?.value) {
    setPoolState({
      lstETHCirculatingSupply: data.totalSupply.value,
      aUSDCirculatingSupply: data.totalSupply.value
    });
  }

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
