import { useState, useEffect } from "react";

const useDebounce = (value, time) => {
  const [debounceValue, setDebounceValue] = useState(value);
  useEffect(() => {
    const timeOut = setTimeout(() => {
      setDebounceValue(value);
    }, time);
    return () => {
      clearTimeout(timeOut);
    };
  }, [time, value]);
  return debounceValue;
};

export default useDebounce;
