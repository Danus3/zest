import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

import { WagmiConfig, createConfig, configureChains } from "wagmi";
import { mainnet, goerli } from "@wagmi/core/chains";

import * as Toast from "@radix-ui/react-toast";

import { createPublicClient, http } from "viem";
import { publicProvider } from "wagmi/providers/public";
import { InjectedConnector } from "wagmi/connectors/injected";
import { WalletConnectConnector } from "wagmi/connectors/walletConnect";
import { MetaMaskConnector } from "wagmi/connectors/metaMask";
import * as ToastPrimitive from "@radix-ui/react-toast";

export const queryClient = new QueryClient();

const { chains } = configureChains([mainnet, goerli], [publicProvider()]);

const config = createConfig({
  autoConnect: true,
  publicClient: createPublicClient({
    chain: goerli,
    transport: http()
  }),
  connectors: [
    new InjectedConnector({
      chains,
      options: {
        name: "Injected",
        shimDisconnect: true
      }
    }),
    new MetaMaskConnector({ chains }),
    new WalletConnectConnector({
      chains,
      options: {
        projectId: "5d33f0689d3a5b2b54836b30032fc6e3"
      }
    })
  ]
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Toast.Provider swipeDirection={"right"}>
      <QueryClientProvider client={queryClient}>
        <WagmiConfig config={config}>
          <App />
          <ToastPrimitive.Viewport className="[--viewport-padding:_25px] fixed top-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
        </WagmiConfig>
      </QueryClientProvider>
    </Toast.Provider>
  </React.StrictMode>
);
