import NavBar from "./NavBar";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className={"text-center text-white"}>
      <NavBar />
      <Outlet></Outlet>
    </div>
  );
};

export default Layout;
