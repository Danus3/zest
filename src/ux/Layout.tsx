import NavBar from "./NavBar";
import { Outlet, useLocation } from "react-router-dom";
import classNames from "classnames";

const Layout = () => {
  const { pathname } = useLocation();
  return (
    <div
      className={classNames("text-center text-white pb-20", {
        "pt-16": pathname !== "/"
      })}
    >
      <NavBar />
      <Outlet></Outlet>
    </div>
  );
};

export default Layout;
