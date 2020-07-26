import { useState } from 'react';

export const useToggle = (initial) => {
  const [isToggled, setToggled] = useState(initial);
  const toggle = () => setToggled((prev) => !prev);
  return { isToggled, setToggled, toggle };
};
