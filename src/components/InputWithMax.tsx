import { ConnectKitButton } from "connectkit";
import { useEffect, useState } from "react";

import BigNumber from "bignumber.js";

export const formatInputValue = (value: string) => {
  const regex = /^(\d+\.?\d*|\.\d*)/;
  const matches = value.match(regex);
  if (matches !== null) {
    value = matches[0];
  } else {
    value = "";
  }

  return value;
};

const InputWithMax = ({
  setValue,
  maxValue,
  value,
  placeholder,
}: {
  setValue: (value: string) => void;
  maxValue: string;
  value?: string;
  placeholder?: string;
}) => {
  const [internalValue, setInternalValue] = useState("");

  useEffect(() => {
    if (value === undefined) return;
    setInternalValue(value);
  }, [value]);

  return (
    <div className={"relative"}>
      <input
        // type="number"
        className={"w-full placeholder:text-neutral-600"}
        onChange={(e) => {
          const formatValue = formatInputValue(e.target.value);

          setInternalValue(formatValue);

          if (isNaN(Number(formatValue)) || formatValue.match(/^[0.]+$/)) {
            return;
          }

          const isGreaterThanMax = new BigNumber(formatValue).gt(maxValue);
          setValue(isGreaterThanMax ? maxValue : formatValue);
        }}
        min={"0"}
        value={internalValue}
        placeholder={placeholder || "Please input amount"}
        step={"any"}
      />
      <ConnectKitButton.Custom>
        {({ isConnected, show }) => {
          return (
            <div
              className={
                "absolute top-2 right-2 flex flex-col justify-center text-black bg-amber-400 px-1 rounded-md cursor-pointer"
              }
              onClick={() => {
                if (!isConnected) {
                  show?.();
                } else {
                  setInternalValue(maxValue);
                  setValue(maxValue);
                }
              }}
            >
              {isConnected ? "MAX" : "Connect"}
            </div>
          );
        }}
      </ConnectKitButton.Custom>
    </div>
  );
};

export default InputWithMax;
