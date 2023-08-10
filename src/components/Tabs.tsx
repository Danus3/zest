import React from "react";
import classNames from "classnames";

import { twMerge } from "tailwind-merge";

const Tabs = ({
  initialTab = 0,
  labels = [],
  currentTab = 0,
  onChange,
  disabled = []
}: {
  initialTab?: number;
  labels: string[];
  currentTab?: number;
  onChange?: (
    event: React.MouseEvent<HTMLDivElement>,
    newValue: number
  ) => void;
  disabled?: boolean[];
  name?: string;
}) => {
  const [tab, setTab] = React.useState(initialTab);

  // const { [name]: currentTabParam } = useParams();

  // const s = usePus

  React.useEffect(() => {
    if (currentTab !== undefined) {
      setTab(currentTab);
    }
  }, [currentTab]);

  const handleChange = (
    event: React.MouseEvent<HTMLDivElement>,
    newValue: number
  ) => {
    setTab(newValue);
    onChange?.(event, newValue);
  };
  if (!labels.length) {
    return null;
  }
  return (
    <div
      className={
        "flex flex-row justify-between p-1 border-amber-400 border-[1px] rounded-md"
      }
    >
      {labels.map((label, index) => {
        return (
          <div
            key={index}
            onClick={e => {
              if (disabled[index]) {
                return;
              }
              handleChange(e, index);
            }}
            className={twMerge(
              classNames(
                "w-full text-center text-white rounded-sm cursor-pointer",
                {
                  "bg-amber-400 text-black": index === tab
                },
                {
                  "text-neutral-600": disabled[index],
                  "cursor-not-allowed": disabled[index]
                }
              )
            )}
          >
            {label}
          </div>
        );
      })}
    </div>
  );
};

export default Tabs;
