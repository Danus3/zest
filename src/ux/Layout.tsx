import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";
import classNames from "classnames";
import { isApp, isLocalhost } from "../config.ts";

const Layout = () => {
  return (
    <div
      className={classNames("text-center text-white pb-16", {
        ["pt-16"]: isApp || isLocalhost
      })}
    >
      <NavBar />
      <Outlet></Outlet>
    </div>
  );
};

export default Layout;
