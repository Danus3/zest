import React from "react";
import classNames from "classnames";

const Tabs = ({
  initialTab = 0,
  labels = [],
  currentTab = 0,
  onChange
}: {
  initialTab?: number;
  labels: string[];
  currentTab?: number;
  onChange?: (
    event: React.MouseEvent<HTMLDivElement>,
    newValue: number
  ) => void;
}) => {
  const [tab, setTab] = React.useState(initialTab);

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
              handleChange(e, index);
            }}
            className={classNames(
              "w-full text-center text-black rounded-sm cursor-pointer",
              {
                "bg-amber-400 text-black": index === tab,
                "text-white": index !== tab
              }
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
