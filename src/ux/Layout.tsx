import { PropsWithChildren } from "react";

import homepageBg from "@assets/homepage-bg.jpg";
import NavBar from "./NavBar";

const Layout = ({ children }: PropsWithChildren) => {
  return (
    <div className={"text-center text-white"}>
      <div
        className={
          "bg-cover md:bg-contain bg-no-repeat fixed w-full aspect-square bg-top md:aspect-[3/1]"
        }
        style={{
          backgroundImage: `linear-gradient(180deg, transparent 0%, black 100%), url(${homepageBg})`,
          zIndex: -1
        }}
      ></div>
      <NavBar />
      <div className={"text-center w-11/12 sm:w-3/4 m-auto"}>{children}</div>
    </div>
  );
};

export default Layout;
