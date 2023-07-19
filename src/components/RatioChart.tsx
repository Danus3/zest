import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import { useInViewport } from "ahooks";
import { useQueryClient } from "@tanstack/react-query";

const minPrice = 1300;
const maxPrice = 8000;

const RatioChart = () => {
  const [offsetX, setOffsetX] = useState(0);
  const [totalWidth, setTotalWidth] = useState(0);
  const [totalHeight, setTotalHeight] = useState(0);
  const chartRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!chartRef.current) {
      return;
    }
    setTotalWidth(chartRef.current.getBoundingClientRect().width);
    setTotalHeight(chartRef.current.getBoundingClientRect().height);
  }, []);

  const [isInViewPort] = useInViewport(chartRef);

  const slopeDeg = (Math.atan(totalHeight / totalWidth) * 180) / Math.PI;

  const slopeLength = Math.sqrt(totalHeight ** 2 + totalWidth ** 2);

  const offsetXRatio = offsetX / (totalWidth || 1);

  // const currentStETHPrice = 1800;
  const currentStETHPrice =
    useQueryClient().getQueryData<number>(["stEthPrice", "usd"]) || 0;

  const currentPriceRatio =
    (Math.max(currentStETHPrice, minPrice) - minPrice) / (maxPrice - minPrice);

  const calculatedLstETHPrice =
    (offsetXRatio || currentPriceRatio) * (maxPrice - minPrice);

  const calculatedStETHPrice = calculatedLstETHPrice + minPrice;

  const lstLeverageRatio = calculatedStETHPrice / calculatedLstETHPrice;

  const aUSDLeverageRatio = calculatedStETHPrice / 1300;

  // const maxAUSDLeverageRatio = maxPrice / 1300;
  //
  // const minAUSDLeverageRatio = minPrice / 1300;
  //
  // const maxLSTLeverageRatio = Infinity;
  //
  // const minLSTLeverageRatio = (maxPrice - minPrice) / maxPrice;

  // console.log(lstLeverageRatio + aUSDLeverageRatio);

  return (
    <div className={"w-full h-full max-w-[1200px] m-auto flex flex-col"}>
      <div className={"flex justify-between"}>
        <div>lstETH Value: ${calculatedLstETHPrice.toFixed(2)}</div>
        <div>stETH Price: ${calculatedStETHPrice.toFixed(2)}</div>
      </div>
      <div className={"my-1"}></div>
      <div className={"flex justify-between relative"}>
        <div
          className={
            "absolute left-0 top-0 h-full bg-amber-400 z-0 rounded-l-md"
          }
          style={{
            width: `${(lstLeverageRatio /
              (lstLeverageRatio + aUSDLeverageRatio)) *
              100}%`,
            zIndex: -1
          }}
        ></div>
        <div
          className={
            "absolute right-0 top-0 h-full bg-cyan-400 z-0 rounded-r-md"
          }
          style={{
            width: `${(aUSDLeverageRatio /
              (lstLeverageRatio + aUSDLeverageRatio)) *
              100}%`,
            zIndex: -1
          }}
        ></div>
        <div className={"text-black"}>
          &nbsp;lstETH Leverage Ratio: {lstLeverageRatio.toFixed(2)}x
        </div>
        <div className={"text-black"}>
          aUSD APR Leverage Ratio: {aUSDLeverageRatio.toFixed(2)}x&nbsp;
        </div>
      </div>
      <div className={"my-2"}></div>
      <div
        className={
          "w-full grow border-l-[1px] border-b-[1px] border-neutral-400 text-left relative min-h-[200px]"
        }
        ref={chartRef}
        onMouseMove={e => {
          setOffsetX(
            Math.max(
              0,
              e.clientX - e.currentTarget.getBoundingClientRect().left
            )
          );
        }}
        onTouchMove={e => {
          setOffsetX(
            Math.max(
              0,
              e.touches[0].clientX -
                e.currentTarget.getBoundingClientRect().left
            )
          );
        }}
        onMouseLeave={() => {
          setOffsetX(0);
        }}
      >
        <span
          className={
            "text-left rotate-90 inline-block text-neutral-400 origin-top-left translate-x-[1.5em] inline-block bg-black relative z-10"
          }
        >
          &nbsp;lstETH Value
        </span>
        <div
          className={`h-[1.5px] bg-amber-400 absolute bottom-0 left-0 origin-left z-10 transition-all duration-500`}
          style={{
            width: isInViewPort ? slopeLength : totalWidth,
            transform: isInViewPort ? `rotate(-${slopeDeg}deg)` : ""
          }}
        >
          <div
            className={
              "w-[0.8em] h-[0.8em] rounded-[50%] bg-amber-400 inline-block align-text-top -translate-x-1/2 -translate-y-1/2 relative"
            }
            style={{
              visibility:
                (offsetXRatio || currentPriceRatio) > 0 ? "visible" : "hidden",
              left: `${(offsetXRatio || currentPriceRatio) * slopeLength}px`
            }}
          ></div>
        </div>
        <div
          className={classNames(
            "h-full w-0 border-dashed border-l-[1px] border-neutral-200 absolute top-0"
          )}
          style={{
            left: offsetX,
            visibility: offsetX > 0 ? "visible" : "hidden"
          }}
        ></div>
        <div
          className={"absolute right-0 bottom-0 text-neutral-400 bg-black z-10"}
        >
          stETH Price
        </div>
      </div>
      <div className={"flex justify-between text-neutral-400"}>
        <div>${minPrice}</div>
        <div>${maxPrice}</div>
      </div>
    </div>
  );
};

export default RatioChart;
