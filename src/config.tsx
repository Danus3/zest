import React from "react";

import gitbook from "./assets/gitbook.svg";

const URLParams = new URL(window.location.href);

const { hostname, searchParams, pathname } = URLParams;

export const appURL = "https://app.zestprotocol.xyz";

export const appURLHost = "app.zestprotocol.xyz";

export const landingPageURL = "https://zestprotocol.xyz";

export const landingPageURLHost = "zestprotocol.xyz";

export const isLocalhost = hostname === "localhost";
export const isApp =
  searchParams.get("domain") === "app" || hostname === appURLHost;
export const isLandingPage =
  searchParams.get("domain") === "landing" || hostname === landingPageURLHost;

export const WeedPaperURL = "https://docs.zestprotocol.xyz/";

export const MotivationURL = "https://docs.zestprotocol.xyz/motivation";

export const MediumURL = "https://medium.com/@zestprotocol";

export const DocsURL = "https://docs.zestprotocol.xyz/";

export const TwitterURL = "https://twitter.com/Zest_Blast";

export const isPublicSalePage = pathname.startsWith("/public-sale");

export const isMintRedeemPage = pathname.startsWith("/mint-redeem");

export const routeConfigs: {
  path: string;
  name: string;
  image?: string;
  external?: boolean;
  disabled?: boolean;
  isNotLink?: boolean;
  newPage?: boolean;
  icon?: React.ReactNode;
  tag?: string;
}[] = [
  {
    path: "/genesis",
    name: "Genesis Pool",
    external: true,
    newPage: false,
    tag: "Live",
  },
  {
    path: isApp ? "/" : "/mint-redeem",
    name: "Mint&Redeem",
    disabled: isLandingPage,
    external: true,
    newPage: false,
    // disabled: true,
    tag: "Live",
  },
  {
    path: "/earn",
    name: "Earn",
    disabled: true,
  },
  {
    path: "/esADO",
    name: "esADO",
    disabled: true,
    newPage: false,
  },
  {
    path: "/public-sale",
    name: "Token Sale",
    disabled: true,
  },
  {
    path: WeedPaperURL,
    name: "WeedPaper",
    external: true,
    disabled: true,
  },
  {
    path: MediumURL,
    name: "Medium",
    external: true,
    disabled: true,
  },
  {
    path: DocsURL,
    name: "Docs",
    external: true,
    disabled: isApp,
    icon: <img className="h-5" src={gitbook} alt="" />,
  },
  {
    path: TwitterURL,
    name: "𝕏",
    external: true,
    disabled: isApp,
    icon: <span className={"text-2xl"}>𝕏</span>,
  },
];
