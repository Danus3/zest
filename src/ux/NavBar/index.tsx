import logo from "@/assets/logo.png";
import { routeConfigs } from "@src/config";
import { useState } from "react";
import classNames from "classnames";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Link } from "react-router-dom";
import ConnectBtn from "./ConnectBtn.tsx";

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
          className={classNames(
            "absolute top-6 left-6 md:invisible transition-opacity duration-300",
            isMenuOpen ? "opacity-100" : "opacity-0"
          )}
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
          onClick={e => {
            e.stopPropagation();
          }}
        >
          <Link
            to={"/"}
            onClick={() => {
              setIsMenuOpen(false);
            }}
            className={"shrink-0"}
          >
            <img src={logo} className={"w-32 m-auto"} alt={"logo"} />
          </Link>
          <div className={"flex items-center gap-4 flex-col md:flex-row"}>
            {routeConfigs.map(routeConfig => {
              if (routeConfig.disabled) {
                return null;
              }
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
              return (
                <Link
                  to={routeConfig.path}
                  key={routeConfig.path}
                  onClick={() => {
                    setIsMenuOpen(false);
                  }}
                >
                  {routeConfig.name}
                </Link>
              );
            })}
            <a
              href="https://twitter.com/Adscendo_fi"
              target={"_blank"}
              className={
                "hover:text-neutral-200 relative text-2xl hover:no-underline"
              }
            >
              𝕏
            </a>
            <ConnectBtn />
          </div>
        </div>
      </div>
      <div
        className={classNames(
          "fixed md:invisible z-20 left-4 top-4 p-2 rounded-full backdrop-blur-sm",
          {
            invisible: isMenuOpen
          },
          "transition-opacity duration-300",
          isMenuOpen ? "opacity-0" : "opacity-100"
        )}
      >
        <HamburgerMenuIcon
          onClick={() => {
            setIsMenuOpen(true);
          }}
        />
      </div>
    </>
  );
};

export default NavBar;
