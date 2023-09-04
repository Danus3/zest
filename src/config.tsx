import React from "react";

const URLParams = new URL(window.location.href);

const { hostname, searchParams } = URLParams;

export const appURL = "https://app.adscendo.xyz";

export const appURLHost = "app.adscendo.xyz";

export const landingPageURL = "https://adscendo.xyz";

export const landingPageURLHost = "adscendo.xyz";

export const isLocalhost = hostname === "localhost";
export const isApp =
  searchParams.get("domain") === "app" || hostname === appURLHost;
export const isLandingPage =
  searchParams.get("domain") === "landing" || hostname === landingPageURLHost;

export const WeedPaperURL =
  "https://medium.com/@Adscendo/weedpaper-of-adscendo-773eb7356bad";

export const MotivationURL = "https://docs.adscendo.xyz/motivation";

export const MediumURL = "https://medium.com/@Adscendo";

export const DocsURL = "https://docs.adscendo.xyz/";

export const TwitterURL = "https://twitter.com/Adscendo_fi";

export const isPublicSalePage = window.location.pathname.startsWith(
  "/public-sale"
);

export const routeConfigs: {
  path: string;
  name: string;
  external?: boolean;
  disabled?: boolean;
  newPage?: boolean;
  icon?: React.ReactNode;
}[] = [
  {
    path: isApp ? "/" : "/stats",
    name: "Dashboard",
    disabled: isLandingPage,
    external: isPublicSalePage ? true : false,
    newPage: false
  },
  {
    path: "/mint-redeem",
    name: "Mint&Redeem",
    disabled: isLandingPage,
    external: isPublicSalePage ? true : false,
    newPage: false
  },
  {
    path: "/earn",
    name: "Earn",
    disabled: isLandingPage,
    external: isPublicSalePage ? true : false,
    newPage: false
  },
  {
    path: "/esADO",
    name: "esADO",
    disabled: isLandingPage,
    external: isPublicSalePage ? true : false,
    newPage: false
  },
  {
    path: "/public-sale",
    name: "Public Sale",
    disabled: isLandingPage,
    external: true,
    newPage: false
  },
  {
    path: WeedPaperURL,
    name: "WeedPaper",
    external: true,
    disabled: isApp
  },
  {
    path: MediumURL,
    name: "Medium",
    external: true,
    disabled: isApp
  },
  {
    path: DocsURL,
    name: "Docs",
    external: true,
    disabled: isApp
  },
  {
    path: TwitterURL,
    name: "Twitter",
    external: true,
    disabled: isApp,
    icon: <span className={"text-2xl"}>𝕏</span>
  }
];
