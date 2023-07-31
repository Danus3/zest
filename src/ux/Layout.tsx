import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import classNames from "classnames";
import { isApp, isLocalhost } from "../config.ts";

// import homepageBg from "@assets/homepage-bg.webp";

const Layout = () => {
  return (
    <div
      className={classNames("text-center text-white pb-16", {
        [isApp || isLocalhost ? "md:pt-32 pt-8" : "pt-0"]: true
      })}
      style={{
        background:
          isApp || isLocalhost
            ? "radial-gradient(50% 50% at 100% 0%, #111111 0%, black 100%)"
            : undefined
      }}
    >
      <NavBar />
      <Outlet></Outlet>
    </div>
  );
};

export default Layout;
