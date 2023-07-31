import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Layout from "./ux/Layout.tsx";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSetAtom } from "jotai";
import {
  adoPriceAtom,
  aUSDPriceAtm,
  getSTETHPoolStats,
  stEtherPriceAtom
} from "./state";
import { Fragment, lazy, Suspense, useEffect } from "react";
// import MintAndRedeem from "./pages/MintAndRedeem";
import { useToken } from "wagmi";
import { isApp } from "./config.ts";
import Homepage from "./pages/Homepage";

const MintAndRedeem = lazy(() => import("./pages/MintAndRedeem"));
const Earn = lazy(() => import("./pages/Earn"));
const Stats = lazy(() => import("./pages/Stats"));

// const Homepage = lazy(() => import("./pages/Homepage"));

const routeLoading = (
  <div className={"page-content flex flex-col gap-4"}>
    {Array.from({ length: 2 }).map((_, index) => (
      <Fragment key={index}>
        <h1 className={"text-center rounded-md bg-neutral-800 w-full"}>
          &nbsp;
        </h1>
        <div
          className={"text-center rounded-md bg-neutral-800 w-full h-48"}
        ></div>
      </Fragment>
    ))}
  </div>
);

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div className={"text-white text-center"}>404</div>,
    children: [
      {
        path: "",
        element: (
          <Suspense fallback={routeLoading}>
            {isApp ? <Stats /> : <Homepage />}
          </Suspense>
        )
      },
      {
        path: "mint-redeem",
        element: (
          <Suspense fallback={routeLoading}>
            <MintAndRedeem />
          </Suspense>
        )
      },
      {
        path: "stats",
        element: (
          <Suspense fallback={routeLoading}>
            <Stats />
          </Suspense>
        )
      },
      {
        path: "earn",
        element: (
          <Suspense fallback={routeLoading}>
            {/*{routeLoading}*/}
            <Earn />
          </Suspense>
        )
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
