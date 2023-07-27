const InputWithMax = ({
  value,
  setValue,
  onMaxClick
}: {
  value: string;
  setValue: (value: string) => void;
  onMaxClick: () => void;
}) => {
  return (
    <div className={"relative"}>
      <input
        type="number"
        className={"w-full"}
        onChange={e => {
          setValue(e.target.value);
        }}
        value={value}
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
