import { useState } from "react";
import classNames from "classnames";
import Tooltip from "./Tooltip.tsx";

const Slider: React.FC<{
  maxMultiplier: number;
  maxTime: string;
}> = ({ maxMultiplier, maxTime }) => {
  const [currentMultiplier, setCurrentMultiplier] = useState(1);
  return (
    <div className="flex flex-col text-right">
      <div className={"flex flex-row justify-between"}>
        <p>
          Boost
          <Tooltip
            text={"The longer you select, the greater your reward multiplier"}
          ></Tooltip>
        </p>
        <p>{maxMultiplier}x</p>
      </div>
      <div className={"bg-neutral-800 rounded-md h-[12px] relative"}>
        <div
          className={"absolute h-full bg-amber-400 rounded-md transition-all"}
          style={{
            width: `${(currentMultiplier / maxMultiplier) * 100}%`
          }}
        >
          <div
            className={
              "absolute cursor-pointer flex items-center justify-center text-[0.8em] text-black right-0 top-0 bg-amber-400 w-[18px] h-[18px] rounded-xl z-10 -translate-y-[3px]"
            }
          >
            {currentMultiplier}X
          </div>
        </div>
        {Array.from(Array(maxMultiplier).keys()).map((_, index) => {
          return (
            <div
              key={index}
              className={classNames(
                index < currentMultiplier ? "bg-amber-300" : "bg-neutral-700",
                "hover:scale-125 h-[12px] w-[12px] rounded-xl absolute -translate-x-full cursor-pointer"
              )}
              style={{
                left: `${((index + 1) / maxMultiplier) * 100}%`
              }}
              onClick={() => {
                setCurrentMultiplier(index + 1);
              }}
            ></div>
          );
        })}
      </div>
      <p>{maxTime}</p>
    </div>
  );
};

export default Slider;
