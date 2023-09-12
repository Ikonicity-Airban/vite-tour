import { useEffect, useState } from "react";

type SetValue<T> = (value: T | ((prevValue: T) => T)) => void;

function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item =
        /* In this code, `window` is a global object in the browser environment that
      represents the current window or tab. */
        window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(`Error retrieving value from localStorage: ${error}`);
      return initialValue;
    }
  });

  const setValue: SetValue<T> = (value: T | ((prevValue: T) => T)) => {
    try {
      const newValue = value instanceof Function ? value(storedValue) : value;

      setStoredValue(newValue);
      window.localStorage.setItem(key, JSON.stringify(newValue));
    } catch (error) {
      console.error(`Error setting value to localStorage: ${error}`);
    }
  };

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === key) {
        try {
          const newValue = event.newValue
            ? JSON.parse(event.newValue)
            : initialValue;
          setStoredValue(newValue);
        } catch (error) {
          console.error(`Error parsing value from localStorage: ${error}`);
        }
      }
    };

    window.addEventListener("storage", handleStorageChange);

    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [key, initialValue]);

  return [storedValue, setValue];
}

export default useLocalStorage;
