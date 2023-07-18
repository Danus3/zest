import { useState } from "react";
import classNames from "classnames";

const RatioChart = () => {
  const [offsetX, setOffsetX] = useState(0);
  const [totalWidth, setTotalWidth] = useState(0);
  const rotate = 12;
  const rotateInDeg = (rotate / 180) * Math.PI;
  const cos = Math.cos(rotateInDeg);
  const slopeRatio = 1 / cos;
  return (
    <div>
      <h1>RatioChart</h1>
      <div>left%: {offsetX / totalWidth}</div>
      <div className={"my-2"}></div>
      <div
        className={
          "w-full aspect-[3] border-l-[1px] border-b-[1px] border-neutral-400 text-left relative"
        }
        onMouseMove={e => {
          setTotalWidth(e.currentTarget.getBoundingClientRect().width);
          setOffsetX(
            Math.max(
              0,
              e.clientX - e.currentTarget.getBoundingClientRect().left
            )
          );
        }}
        onMouseLeave={() => {
          setOffsetX(0);
        }}
      >
        <span className={"text-left rotate-90 inline-block text-neutral-400"}>
          &nbsp;APY
        </span>
        <div
          className={`h-[1.5px] bg-red-600 absolute top-0 right-0 origin-right -rotate-12  z-10`}
          style={{
            width: `${slopeRatio * 100}%`
          }}
        >
          <div
            className={
              "w-[0.8em] h-[0.8em] rounded-[50%] bg-red-600 inline-block align-text-top -translate-x-1/2 -translate-y-1/2 relative"
            }
            style={{
              visibility: offsetX > 0 ? "visible" : "hidden",
              left: `${offsetX * slopeRatio}px`
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
      </div>
      <div className={"text-left text-neutral-400"}>Utilization ratio</div>
    </div>
  );
};

export default RatioChart;
