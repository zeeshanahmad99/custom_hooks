import { useState, useEffect, useRef } from 'react';

export function useStateCallback(initialState) {
  const [state, setState] = useState(initialState);
  const cbRef = useRef(null);

  const setStateCallback = (state, cb) => {
    cbRef.current = cb;
    setState(state);
  };

  useEffect(() => {
    if (cbRef.current) {
      cbRef.current(state);
      cbRef.current = null; // reset after execution
    }
  }, [state]);

  return [state, setStateCallback];
}
