import zestChar from "@/assets/zest-char.svg";
import zestShape from "@/assets/zest-shape.svg";
import { Cross1Icon, HamburgerMenuIcon } from "@radix-ui/react-icons";
import { routeConfigs } from "@src/config";
import classNames from "classnames";
import { ConnectKitButton } from "connectkit";
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { twMerge } from "tailwind-merge";
import ConnectBtn from "./ConnectBtn.tsx";

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const { pathname } = useLocation();

  return (
    <>
      <div
        className={twMerge(
          "p-3 flex justify-center fixed md:fixed top-0 w-full  h-[100vh] md:h-auto md:block z-20 transition-[backdrop-filter] duration-300",
          !isMenuOpen && "hidden"
        )}
        style={{
          background: "rgba(0, 0, 0, 0.90)",
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
            "flex flex-col md:flex-row justify-start md:justify-around gap-4 mt-8 md:m-auto"
          }
          onClick={(e) => {
            e.stopPropagation();
          }}
        >
          <Link
            to={"/"}
            onClick={() => {
              setIsMenuOpen(false);
            }}
            className={"shrink-0 self-center flex gap-1"}
          >
            <img src={zestShape} className={"w-16 m-auto"} alt={"logo"} />
            <img src={zestChar} className={"w-16 m-auto"} alt={"logo"} />
          </Link>
          <div className={"flex items-center gap-4 flex-col md:flex-row"}>
            {routeConfigs.map((routeConfig) => {
              if (routeConfig.disabled) {
                return null;
              }
              const match =
                pathname === routeConfig.path &&
                "text-amber-400 underline underline-offset-4";
              if (routeConfig.external) {
                return (
                  <a
                    href={routeConfig.path}
                    key={routeConfig.path}
                    target={routeConfig.newPage === false ? "_self" : "_blank"}
                    className={twMerge(
                      "animate-slideIn md:animate-none transition-all underline-offset-1 hover:underline-offset-4",
                      match
                    )}
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
                    "animate-slideIn md:animate-none transition-all underline-offset-1 hover:underline-offset-4",
                    match
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
            invisible: isMenuOpen,
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
