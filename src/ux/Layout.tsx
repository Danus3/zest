import { PropsWithChildren } from "react";

import homepageBg from "@assets/homepage-bg.jpg";
import NavBar from "./NavBar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div
      className={"text-center text-white lg:bg-contain bg-top bg-cover"}
      style={{
        backgroundImage: `linear-gradient(180deg, transparent 0%, black 100%), url(${homepageBg})`
      }}
    >
      <NavBar />
      <div className={"text-center w-11/12 sm:w-3/4 m-auto"}>{children}</div>
    </div>
  );
};

export default Layout;
