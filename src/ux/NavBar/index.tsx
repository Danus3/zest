import logo from "@/assets/logo.png";
import { routeConfigs } from "../../config";
import { useState } from "react";
import classNames from "classnames";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <>
      <div
        className={classNames(
          "p-3 flex justify-center md:backdrop-blur-[2px] fixed md:fixed top-0 w-full  h-[100vh] md:h-auto md:visible z-20 transition-[backdrop-filter] duration-300",
          {
            invisible: !isMenuOpen,
            ["backdrop-blur-md"]: isMenuOpen
          }
        )}
        style={{
          background: "rgba(0, 0, 0, 0.20)"
        }}
      >
        <div
          className={"absolute top-4 left-4 md:invisible"}
          onClick={() => {
            setIsMenuOpen(false);
          }}
        >
          <Cross1Icon />
        </div>
        <div
          className={
            "w-3/4 flex flex-col md:flex-row justify-start md:justify-between gap-4"
          }
        >
          <a href={"/"}>
            <img src={logo} className={"w-32 m-auto"} alt={"logo"} />
          </a>
          <div className={"flex items-center gap-4 flex-col md:flex-row"}>
            {routeConfigs.map(routeConfig => {
              if (routeConfig.external) {
                return (
                  <a
                    href={routeConfig.path}
                    key={routeConfig.path}
                    target={"_blank"}
                  >
                    {routeConfig.name}
                  </a>
                );
              }
              if (routeConfig.disabled) {
                return null;
              }
              return (
                <Link to={routeConfig.path} key={routeConfig.path}>
                  {routeConfig.name}
                </Link>
              );
            })}
            <button className={"bg-amber-400 rounded-3xl"}>Launch App</button>
          </div>
        </div>
      </div>
      <div
        className={classNames("fixed top-4 left-4 md:invisible z-20", {
          invisible: isMenuOpen
        })}
        onClick={() => {
          setIsMenuOpen(true);
        }}
      >
        <HamburgerMenuIcon />
      </div>
    </>
  );
};

export default NavBar;
