import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import classNames from "classnames";
import { isApp, isLocalhost } from "../config.ts";

import homepageBg from "@assets/homepage-bg.webp";

const Layout = () => {
  return (
    <div
      className={classNames("text-center text-white pb-16", {
        [isApp || isLocalhost ? "pt-32" : "pt-0"]: true
      })}
    >
      <img
        src={homepageBg}
        className={classNames(
          "w-full absolute left-0 top-0 -z-10 brightness-[35%] blur-xl",
          {
            block: isApp,
            hidden: !isApp
          }
        )}
        alt={"banner"}
      />
      <NavBar />
      <Outlet></Outlet>
    </div>
  );
};

export default Layout;
