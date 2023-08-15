import logo from "@/assets/logo.png";
import { routeConfigs } from "@src/config";
import { useState } from "react";
import classNames from "classnames";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { Link, useLocation } from "react-router-dom";
import ConnectBtn from "./ConnectBtn.tsx";
import { twMerge } from "tailwind-merge";
import { ConnectKitButton } from "connectkit";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { pathname } = useLocation();

  return (
    <>
      <div
        className={twMerge(
          "p-3 flex justify-center backdrop-blur-md md:backdrop-blur-[2px] fixed md:fixed top-0 w-full  h-[100vh] md:h-auto md:block z-20 transition-[backdrop-filter] duration-300",
          !isMenuOpen && "hidden"
        )}
        style={{
          background: "rgba(0, 0, 0, 0.20)"
        }}
      >
        <div
          className={classNames(
            "absolute top-4 left-4 md:invisible transition-opacity duration-300 rounded-full p-2 bg-[rgba(45,45,45,0.9)] transition-opacity",
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
            "w-3/4 flex flex-col md:flex-row justify-start md:justify-between gap-4 mt-8 md:m-auto"
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
            className={"shrink-0 self-center"}
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
                    className={twMerge("animate-slideIn md:animate-none")}
                  >
                    {routeConfig.icon || routeConfig.name}
                  </a>
                );
              }
              return (
                <Link
                  to={routeConfig.path}
                  key={routeConfig.path}
                  onClick={() => {
                    setTimeout(() => {
                      setIsMenuOpen(false);
                    }, 300);
                  }}
                  className={twMerge(
                    "animate-slideIn md:animate-none underline-offset-1 transition-all",
                    pathname === routeConfig.path &&
                      "text-amber-400 underline underline-offset-4"
                  )}
                >
                  {routeConfig.name}
                </Link>
              );
            })}
            <ConnectBtn />
          </div>
        </div>
      </div>
      <div
        className={classNames(
          "fixed md:invisible z-20 left-4 top-4 p-2 rounded-full bg-[rgba(45,45,45,0.9)]",
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
      <div
        className={classNames(
          "fixed top-4 right-4 md:hidden inline-block z-20",
          isMenuOpen ? "opacity-0" : "opacity-100"
        )}
      >
        <ConnectKitButton.Custom>
          {({ isConnected, show, truncatedAddress }) => {
            return (
              <button
                onClick={show}
                className={"p-2 rounded-xl bg-[rgba(45,45,45,0.9)]"}
              >
                {isConnected ? truncatedAddress : "Connect Wallet"}
              </button>
            );
          }}
        </ConnectKitButton.Custom>
      </div>
    </>
  );
};

export default NavBar;
