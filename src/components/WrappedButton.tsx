import { twMerge } from "tailwind-merge";

const WrappedButton: React.FC<{
  isLoading?: boolean;
} & React.DetailedHTMLProps<
  React.ButtonHTMLAttributes<HTMLButtonElement>,
  HTMLButtonElement
>> = props => {
  const { isLoading, className, children, ...rest } = props;
  return (
    <button
      className={twMerge("emphasis", className)}
      disabled={isLoading}
      {...rest}
    >
      {children}
    </button>
  );
};

export default WrappedButton;
