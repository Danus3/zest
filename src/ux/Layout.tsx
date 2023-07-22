import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router-dom";
import classNames from "classnames";

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <div
      className={classNames("text-center text-white pb-16", {
        "pt-16": pathname !== "/",
        "pb-0": pathname === "/"
      })}
    >
      <NavBar />
      <Outlet></Outlet>
    </div>
  );
};

export default Layout;
