import { stEtherPriceAtom } from "@state";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSetAtom } from "jotai";
import { Fragment, lazy, Suspense } from "react";
import { createHashRouter, RouterProvider } from "react-router-dom";
import Layout from "./ux/Layout.tsx";
// import MintAndRedeem from "./pages/MintAndRedeem";
import Homepage from "@pages/Homepage";
import { isApp } from "./config.tsx";
import useUserBalance from "@hooks/useUserBalance.ts";
import useTokenInfo from "@hooks/useTokenInfo.ts";
import Stake from "@pages/Stake/index.tsx";

const MintAndRedeem = lazy(() => import("@pages/MintAndRedeem"));
// const Earn = lazy(() => import("@pages/Earn"));
// const Stats = lazy(() => import("@pages/Stats"));
// const EsADO = lazy(() => import("@pages/esADO"));
// const PublicSale = lazy(() => import("@pages/PublicSale"));

// const Homepage = lazy(() => import("./pages/Homepage"));

// function Email(props) {
//   const { url } = props;
//
//   return (
//     <Html lang="en">
//       <Button href={url}>Click me</Button>
//     </Html>
//   );
// }

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

const router = createHashRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <div className={"text-white text-center"}>Error</div>,

    children: [
      {
        path: "",
        element: (
          <Suspense fallback={routeLoading}>
            {isApp ? (
              <Suspense fallback={routeLoading}>
                <MintAndRedeem />
              </Suspense>
            ) : (
              <Homepage />
            )}
          </Suspense>
        ),
      },
      {
        path: "genesis",
        element: (
          <Suspense fallback={routeLoading}>
            <Stake />
          </Suspense>
        ),
      },
      {
        path: "mint-redeem",
        element: (
          <Suspense fallback={routeLoading}>
            <MintAndRedeem />
          </Suspense>
        ),
      },
      // {
      //   path: "stats",
      //   element: (
      //     <Suspense fallback={routeLoading}>
      //       <Stats />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "earn",
      //   element: (
      //     <Suspense fallback={routeLoading}>
      //       <Earn />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "esADO",
      //   element: (
      //     <Suspense fallback={routeLoading}>
      //       <EsADO />
      //     </Suspense>
      //   ),
      // },
      // {
      //   path: "public-sale",
      //   element: (
      //     <Suspense fallback={routeLoading}>
      //       <PublicSale />
      //     </Suspense>
      //   ),
      // },
    ],
  },
]);

const App = () => {
  const setEThPrice = useSetAtom(stEtherPriceAtom);

  /**
   * @description Fetch stETH price from coingecko
   */
  useQuery<number>(
    ["ethereum", "usd"],
    async () => {
      return axios
        .get<{
          ["ethereum"]: {
            usd: number;
          };
        }>(
          "https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=usd"
        )
        .then((response) => {
          const ethPrice = response.data["ethereum"].usd || 0;
          setEThPrice(ethPrice);
          return ethPrice;
        });
    },
    {
      refetchInterval: 60000,
    }
  );

  useTokenInfo();

  useUserBalance();

  return <RouterProvider router={router}></RouterProvider>;
};

export default App;
