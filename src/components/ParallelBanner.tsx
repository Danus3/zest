import React from "react";
import classNames from "classnames";

const ParallelBanner: React.FC<{
  src: string;
  style?: React.CSSProperties;
}> = ({ src, style }) => {
  const [translateX, setTranslateX] = React.useState(0);
  const [translateY, setTranslateY] = React.useState(0);
  const [moveOut, setMoveOut] = React.useState(false);

  return (
    <div
      className={
        "bg-cover md:bg-contain bg-no-repeat w-full bg-top aspect-[1.2] md:aspect-[2.96/1] relative flex  justify-center items-end overflow-hidden"
      }
      onMouseEnter={() => {
        setMoveOut(true);
        setTimeout(() => {
          setMoveOut(false);
        }, 100);
      }}
      onMouseMove={(e) => {
        setTranslateX((e.clientX - window.innerWidth / 2) / 20);
        setTranslateY((e.clientY - window.innerHeight / 2) / 20);
      }}
      onMouseLeave={() => {
        setTranslateX(0);
        setTranslateY(0);
        setMoveOut(true);
      }}
      style={style}
    >
      <img
        alt={"banner"}
        src={src}
        className={classNames(
          "object-cover absolute inset-0 h-full duration-100 origin-center",
          {
            "transition-all": moveOut,
          }
        )}
        style={{
          transform:
            window.innerWidth <= 768
              ? undefined
              : `scale(1.1) translate(${translateX}px, ${translateY}px)`,
        }}
      ></img>
      <div
        className={
          "inset-0 absolute bg-gradient-to-b from-transparent to-black drop-shadow-2xl"
        }
      ></div>
    </div>
  );
};

export default ParallelBanner;
