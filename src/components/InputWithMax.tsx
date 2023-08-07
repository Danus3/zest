const InputWithMax = ({
  value,
  setValue,
  onMaxClick,
  ...props
}: {
  value: string;
  setValue: (value: string) => void;
  onMaxClick: () => void;
}) => {
  return (
    <div className={"relative"}>
      <input
        type="number"
        className={"w-full placeholder:text-neutral-600"}
        onChange={e => {
          setValue(e.target.value);
        }}
        value={value === "0" ? "" : value}
        min={0}
        placeholder={"Please input amount"}
        {...props}
      />
      <div
        className={
          "absolute top-2 right-2 flex flex-col justify-center text-black bg-amber-400 px-1 rounded-md cursor-pointer"
        }
        onClick={() => {
          onMaxClick();
        }}
      >
        MAX
      </div>
    </div>
  );
};

export default InputWithMax;
