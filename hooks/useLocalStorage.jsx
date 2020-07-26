import { useState, useEffect } from 'react';

export const useLocalStorage = (key, initial) => {
  const [value, setValue] = useState(() => {
    const savedValue = JSON.parse(localStorage.getItem(key));
    if (savedValue) return savedValue;
    if (initial instanceof Function) return initial();
    return initial;
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [value]);

  return [value, setValue];
};
