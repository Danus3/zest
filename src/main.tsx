import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./index.tsx";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider, theme } from "antd";
import { configureChains, createConfig, WagmiConfig } from "wagmi";

import { type Chain } from "viem";

import { ConnectKitProvider, getDefaultConfig } from "connectkit";

import * as Toast from "@radix-ui/react-toast";
import * as ToastPrimitive from "@radix-ui/react-toast";
import { publicProvider } from "wagmi/providers/public";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import { isMintRedeemPage } from "../src/config.tsx";

export const queryClient = new QueryClient();

// const chain = isPublicSalePage ? [mainnet] : [goerli];

const sepolia = {
  id: 168587773,
  name: "Blast Sepolia",
  network: "blast-sepolia",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://blast-sepolia.blockpi.network/v1/rpc/public"] },
    public: { http: ["https://blast-sepolia.blockpi.network/v1/rpc/public"] },
  },
  blockExplorers: {
    default: { name: "BlastIO", url: "https://testnet.blastscan.io" },
  },

  testnet: true,
} as const satisfies Chain;

export const mainnet = {
  id: 81457,
  name: "Blast Mainnet",
  network: "blast",
  nativeCurrency: { name: "Ether", symbol: "ETH", decimals: 18 },
  rpcUrls: {
    default: { http: ["https://rpc.blast.io	"] },
    public: { http: ["https://rpc.ankr.com/blast"] },
  },
  blockExplorers: {
    default: { name: "BlastIO", url: "https://blastscan.io" },
  },

  testnet: true,
} as const satisfies Chain;

const chain = isMintRedeemPage ? [sepolia, mainnet] : [sepolia, mainnet];

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
const { chains } = configureChains(chain, [publicProvider()]);

const config = createConfig(
  getDefaultConfig({
    [`${"alch"}${"emyId"}`]: `${"3nDQrJ9xGiV4EP24"}${"Rakw3PexQLkfwnJy"}`,
    autoConnect: true,
    walletConnectProjectId: "5d33f0689d3a5b2b54836b30032fc6e3",

    // Required
    appName: "Zest",
    chains,

    // Optional
    appDescription: "Zest Protocol",
    appUrl: "https://zestprotocol.xyz/", // your app's url
    appIcon: "https://zestprotocol.xyz/zest.svg", // your app's icon, no bigger than 1024x1024px (max. 1MB),
  })
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ConfigProvider
      theme={{
        // 1. 单独使用暗色算法
        algorithm: theme.darkAlgorithm,

        // 2. 组合使用暗色算法与紧凑算法
        // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
      }}
    >
      <Toast.Provider swipeDirection={"right"}>
        <RadixTooltip.Provider delayDuration={0}>
          <QueryClientProvider client={queryClient}>
            <WagmiConfig config={config}>
              <ConnectKitProvider
                options={{
                  hideNoWalletCTA: true,
                  overlayBlur: 4,
                }}
              >
                <App />
              </ConnectKitProvider>
              <ToastPrimitive.Viewport className="[--viewport-padding:_25px] fixed top-0 right-0 flex flex-col p-[var(--viewport-padding)] gap-[10px] w-[390px] max-w-[100vw] m-0 list-none z-[2147483647] outline-none" />
            </WagmiConfig>
          </QueryClientProvider>
        </RadixTooltip.Provider>
      </Toast.Provider>
    </ConfigProvider>
  </React.StrictMode>
);
