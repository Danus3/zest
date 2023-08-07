import * as Slider from "@radix-ui/react-slider";
import { SliderProps } from "@radix-ui/react-slider";

const RadixSlider = (
  props: SliderProps & {
    prefix?: React.ReactNode;
    affix?: React.ReactNode;
  }
) => {
  const { prefix, affix, ...rest } = props;
  return (
    <div className={"flex-grow"}>
      {prefix && <p className={"text-right"}>{prefix}</p>}
      <Slider.Root
        className="relative flex items-center select-none touch-none h-5"
        {...rest}
      >
        <Slider.Track className="bg-neutral-700 relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-amber-400 rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-amber-400 rounded-[10px] focus:outline-none hover:scale-125"
          aria-label="Volume"
        />
      </Slider.Root>
      {affix && <p className={"text-right"}>{affix}</p>}
    </div>
  );
};

export default RadixSlider;
