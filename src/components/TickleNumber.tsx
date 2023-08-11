import React, { useEffect, useState } from "react";
import useMounted from "@src/hooks/utils/useMounted.ts";

const oneTimeRotateTransitionString =
  "transform 0.2s cubic-bezier(0.18, 0.89, 0.48, 1.55)";

const getContinuousRotateTransitionString = (distance = 0) =>
  `transform ${0.3 / distance}s linear`;

const numberArray = Array.from(Array(10).keys());

const getNextNumberInRotateMode = (currentNumber: number) => {
  const currentNumberIndex = numberArray.indexOf(currentNumber);
  const nextNumberIndex = (currentNumberIndex + 1) % numberArray.length;
  return numberArray[nextNumberIndex];
};

const getNumberRotateDistance = (
  currentNumber: number,
  targetNumber: number
) => {
  let distance = 0;
  for (let i = currentNumber; i !== targetNumber; i++) {
    distance++;
    if (i === 9) {
      i = -1;
    }
  }
  return distance;
};

const TickleNumberCell = ({
  currentNumber,
  isCountdown,
  continuouslyRotate
}: {
  currentNumber: number;
  isCountdown?: boolean;
  continuouslyRotate?: boolean;
}) => {
  const [usedNumber, setUsedNumber] = useState<number>(
    currentNumber === 0 ? 1 : 0
  );
  const [style, setStyle] = useState<React.CSSProperties>({
    transform: isCountdown ? "translateY(0%)" : "translateY(-50%)"
  });

  const mounted = useMounted();

  const reset = () => {
    requestAnimationFrame(() => {
      if (!continuouslyRotate) {
        setUsedNumber(currentNumber);
      } else {
        const nextNumber = getNextNumberInRotateMode(usedNumber);
        setUsedNumber(nextNumber);
        rotate(currentNumber, nextNumber);
      }
      setStyle({
        transform:
          continuouslyRotate || isCountdown
            ? "translateY(0%)"
            : "translateY(-50%)",
        transition: undefined
      });
      /**
       * This is a hack to fix the issue that the transition end doesn't work
       */
      setTimeout(() => {
        setStyle({
          transform:
            continuouslyRotate || isCountdown
              ? "translateY(0%)"
              : "translateY(-50%)",
          transition: undefined
        });
      }, 0);
    });
  };

  const rotate = (target: number, rotatedNumber: number) => {
    //   const next = numberArray[(target + 1) % 10];
    //   setUsedValue(next);
    //   continuouslyRotate(next);
    if (rotatedNumber === target) {
      //   reset();
      return;
    }
    requestAnimationFrame(() => {
      setStyle({
        transform: "translateY(-50%)",
        transition: getContinuousRotateTransitionString(
          getNumberRotateDistance(rotatedNumber, target)
        )
      });
    });
  };

  useEffect(() => {
    if (!mounted.current) return;
    if (continuouslyRotate) {
      rotate(currentNumber, usedNumber);
    } else {
      setStyle({
        transform: isCountdown ? "translateY(-50%)" : "translateY(0%)",
        transition: oneTimeRotateTransitionString
      });
    }
  }, [currentNumber, mounted.current, continuouslyRotate]);

  if (isNaN(usedNumber)) {
    return null;
  }

  return (
    <span className={"relative inline-flex overflow-hidden"}>
      <span
        className={"inline-flex absolute flex-col left-0 right-0"}
        style={style}
        onTransitionEnd={reset}
      >
        <span>{isCountdown ? usedNumber : currentNumber}</span>
        <span>
          {continuouslyRotate
            ? numberArray[
                (numberArray.indexOf(usedNumber) + 1) % numberArray.length
              ]
            : isCountdown
            ? currentNumber
            : usedNumber}
        </span>
      </span>
      <span className={"invisible"}>0</span>
    </span>
  );
};

const TickleNumber: React.FC<{
  numberString: string;
  isCountdown?: boolean;
  continuously?: boolean;
}> = ({
  numberString: numberString,
  isCountdown = true,
  continuously = false
}) => {
  if (!numberString?.length) {
    return null;
  }
  return (
    <span className={"whitespace-nowrap"}>
      {numberString.split(".").map((number, index) => {
        const numbers = number.split("");
        return (
          <React.Fragment key={index}>
            <span>
              {numbers.map((number, index) => {
                return isNaN(Number(number)) ? (
                  <span key={index}>{number}</span>
                ) : (
                  <TickleNumberCell
                    key={index}
                    currentNumber={Number(number)}
                    isCountdown={isCountdown}
                    continuouslyRotate={continuously}
                    // wholeNumber={Number(numbers.join(''))}
                  />
                );
              })}
            </span>
            {numberString.includes(".") && index === 0 ? "." : null}
          </React.Fragment>
        );
      })}
    </span>
  );
};

export default TickleNumber;
