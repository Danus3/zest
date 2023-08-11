import { useEffect, useState } from "react";

const InputWithMax = ({
  setValue,
  maxValue,
  value
}: {
  setValue: (value: string) => void;
  maxValue: string;
  value?: string;
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
        onChange={e => {
          setInternalValue(e.target.value);
          if (
            isNaN(Number(e.target.value)) ||
            e.target.value.match(/^[0.]+$/)
          ) {
            return;
          }
          setValue(e.target.value);
        }}
        min={"0"}
        value={internalValue}
        placeholder={"Please input amount"}
        step={"any"}
      />
      <div
        className={
          "absolute top-2 right-2 flex flex-col justify-center text-black bg-amber-400 px-1 rounded-md cursor-pointer"
        }
        onClick={() => {
          setInternalValue(maxValue);
          setValue(maxValue);
        }}
      >
        MAX
      </div>
    </div>
  );
};

export default InputWithMax;
