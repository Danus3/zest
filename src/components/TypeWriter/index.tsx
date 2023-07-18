import React from "react";
import { useInterval, useInViewport } from "ahooks";

import "./index.css";

const Index: React.FC<{
  text: string;
  textPerSecond?: number;
}> = ({ text, textPerSecond }) => {
  const [textToShow, setTextToShow] = React.useState("");
  const [started, setStarted] = React.useState(false);
  const cursorRef = React.useRef<HTMLSpanElement>(null);
  const [cursorInViewport] = useInViewport(cursorRef, {
    rootMargin: "-100px"
  });

  React.useEffect(() => {
    if (cursorInViewport) {
      setStarted(true);
    }
  }, [cursorInViewport]);

  // console.log(cursorInViewport, text);
  const cancel = useInterval(
    () => {
      if (textToShow.length === text.length) {
        return cancel();
      }
      setTextToShow(text.slice(0, textToShow.length + 1));
    },
    !started ? undefined : 1000 / (textPerSecond ?? 8),
    {
      immediate: true
    }
  );
  return (
    <>
      {textToShow}
      {textToShow.length < text.length ? (
        <span className={"animate-blink"} ref={cursorRef}>
          |
        </span>
      ) : null}
    </>
  );
};

export default Index;
