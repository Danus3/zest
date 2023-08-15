import { useEffect, useState } from "react";

const useTabFocused = () => {
  const [tabFocused, setTabFocused] = useState<boolean>(true);

  useEffect(() => {
    const handleVisibilityChange = () => {
      setTabFocused(!document.hidden);
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, []);

  return tabFocused;
};

export default useTabFocused;
