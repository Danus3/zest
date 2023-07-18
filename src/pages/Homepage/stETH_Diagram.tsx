import arrow from "./arrow.svg";
import { useInViewport } from "ahooks";
import { useEffect, useRef, useState } from "react";
import classNames from "classnames";

const STETHDiagram = () => {
  const ref = useRef<HTMLDivElement>(null);

  const [inViewPort] = useInViewport(ref, {
    rootMargin: `-${window.innerHeight / 3}px`
  });

  const [started, setStarted] = useState(false);

  useEffect(() => {
    setStarted(!!inViewPort);
  }, [inViewPort]);

  return (
    <div className={"flex justify-center flex-col items-center"} ref={ref}>
      <div className={"w-1/2 md:w-1/4 max-w-[250px] orb"}>stETH</div>
      <div
        className={classNames(
          "flex justify-between w-full md:w-6/12 text-neutral-400 mt-[-1em] md:mt-[-2em] mb-8 max-w-[500px] opacity-0 transition-all duration-500",
          {
            ["opacity-100"]: started
          }
        )}
      >
        <div className={"diagram-explain"}>
          <div
            style={{
              width: "6em"
            }}
          >
            Price Volatility
          </div>
          <div className={"img-container"}>
            <img src={arrow} alt="arrow" />
          </div>
          <div className={"relative top-[100%]"}>3x-6x</div>
        </div>
        <div className={"diagram-explain"}>
          <div className={"relative top-[100%]"}>1x-5x</div>
          <div
            className={"img-container"}
            style={{
              transform: "translateX(-150%)"
            }}
          >
            <img src={arrow} alt="arrow" className={"rotate-[270deg]"} />
          </div>
          <div
            style={{
              width: "6em"
            }}
          >
            Staking Yield
          </div>
        </div>
      </div>
      <div className={"flex justify-between w-full md:w-6/12 md:mt-8 mt-5"}>
        <div
          className={classNames("orb-square opacity-0", {
            ["opacity-100"]: started,
            ["translate-y-0"]: started,
            ["translate-x-0"]: started,
            ["translate-y-[-100%]"]: !started,
            ["translate-x-full"]: !started
          })}
        >
          lstETH
        </div>
        <div
          className={classNames("orb-square opacity-0", {
            ["opacity-100"]: started,
            ["translate-y-0"]: started,
            ["translate-x-0"]: started,
            ["translate-x-[-100%]"]: !started,
            ["translate-y-[-100%]"]: !started
          })}
        >
          aUSD
        </div>
      </div>
    </div>
  );
};
export default STETHDiagram;
