import logo from "@/assets/logo.png";
import { routeConfigs } from "../../config";

const NavBar = () => {
  return (
    <div
      className={"py-3 flex justify-center backdrop-blur-sm fixed top-0 w-full"}
      style={{
        background: "rgba(0, 0, 0, 0.20)"
      }}
    >
      <div className={"max-w-4xl flex-grow flex justify-between"}>
        <a href={"/"}>
          <img src={logo} className={"w-32"} />
        </a>
        <div className={"flex items-center gap-4"}>
          {routeConfigs.map(routeConfig => {
            return (
              <a href={"/weedpaper"} className={"mx-3"} key={routeConfig.path}>
                {routeConfig.name}
              </a>
            );
          })}
          <button className={"bg-amber-400 rounded-3xl"}>Launch App</button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;
