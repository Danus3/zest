export const routeConfigs: {
  path: string;
  name: string;
  external?: boolean;
  disabled?: boolean;
}[] = [
  {
    path: "/stats",
    name: "Dashboard"
  },
  {
    path: "/mint-redeem",
    name: "Mint&Redeem"
  },
  {
    path: "/earn",
    name: "Earn"
  },
  {
    path: "https://medium.com/@Adscendo/weedpaper-of-adscendo-773eb7356bad",
    name: "WeedPaper",
    external: true
  },
  {
    path: "https://medium.com/@Adscendo",
    name: "Medium",
    external: true
  },
  {
    path: "https://docs.adscendo.xyz/",
    name: "Docs",
    external: true
  }
];
