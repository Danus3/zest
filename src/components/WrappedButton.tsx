import { twMerge } from "tailwind-merge";

import logoRect from "@assets/logo-rect.svg";

const WrappedButton: React.FC<{
  isLoading?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = props => {
  const { isLoading, className, children, disabled, ...rest } = props;
  return (
    <button
      className={twMerge("emphasis relative", className)}
      disabled={isLoading || disabled}
      {...rest}
    >
      <img
        src={logoRect}
        className={twMerge(
          "h-[60%] top-[20%] inline-block absolute opacity-0 transition-all duration-500 scale-125 animate-rotate mr-auto ml-auto left-0 right-0",
          isLoading && "opacity-100 scale-100"
        )}
        alt={""}
      />
      <span
        className={twMerge(
          isLoading ? "opacity-0 scale-75" : "opacity-100 scale-100",
          "transition-all duration-500 inline-block"
        )}
      >
        {children}
      </span>
    </button>
  );
};

export default WrappedButton;
