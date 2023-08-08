import { InfoCircledIcon } from "@radix-ui/react-icons";
import * as RadixTooltip from "@radix-ui/react-tooltip";
import React from "react";

const Tooltip = ({
  text,
  children
}: {
  text?: string;
  children?: React.ReactNode;
}) => {
  if (!text) return <>children</>;
  return (
    <RadixTooltip.Root>
      <RadixTooltip.Trigger asChild>
        {children || (
          <InfoCircledIcon
            className={"inline-block ml-1"}
            style={{
              width: "0.9em"
            }}
          />
        )}
      </RadixTooltip.Trigger>
      <RadixTooltip.Portal>
        <RadixTooltip.Content
          sideOffset={5}
          className={
            "bg-black text-white p-2 rounded-md border-amber-400 border-[1px] text-[0.8em]"
          }
        >
          {text}
          <RadixTooltip.Arrow className="fill-amber-400" />
        </RadixTooltip.Content>
      </RadixTooltip.Portal>
    </RadixTooltip.Root>
  );
};

export default Tooltip;
