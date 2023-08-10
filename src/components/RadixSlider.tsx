import * as Slider from "@radix-ui/react-slider";
import { SliderProps } from "@radix-ui/react-slider";

const RadixSlider = (
  props: SliderProps & {
    sliderPrefix?: React.ReactNode;
    sliderAffix?: React.ReactNode;
  }
) => {
  const { sliderPrefix, sliderAffix, ...rest } = props;
  return (
    <div className={"flex-grow"}>
      {sliderPrefix && <p className={"text-right"}>{sliderPrefix}</p>}
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
      {sliderAffix && <p className={"text-right"}>{sliderAffix}</p>}
    </div>
  );
};

export default RadixSlider;
