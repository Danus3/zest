import { InfoCircledIcon } from "@radix-ui/react-icons";
import Tooltip from "@components/Tooltip.tsx";
import { twMerge } from "tailwind-merge";

export const RatioButton = (
  props: {
    ratio: number;
  } & React.DetailedHTMLProps<
    React.ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  >
) => {
  const { ratio, className, ...rest } = props;
  return (
    <Tooltip text={"% of your balance"}>
      <button
        {...rest}
        style={{
          backgroundImage: `linear-gradient(to right, #f59e0b ${ratio}%, #fde68a ${ratio}%)`,
          ...(props.style || {})
        }}
        className={twMerge(
          "border-[1px] border-amber-400 text-black bg-gradient-to-r from-amber-400 to-amber-600",
          className
        )}
      >
        {ratio.toString()}%&nbsp;
        <InfoCircledIcon className={"inline-block"} />
      </button>
    </Tooltip>
  );
};
