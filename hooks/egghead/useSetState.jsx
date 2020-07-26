import { useReducer, useEffect, useRef } from 'react';

function useSetState(initialState) {
  return useReducer(
    state,
    (newState) => ({ ...state, ...newState }),
    initialState
  );
}

function useSafeSetState(initialState) {
  const [state, setState] = useSetState(initialState);

  const mountedRef = useRef(false);
  useEffect(() => {
    mountedRef.current = true;
    return () => (mountedRef.current = false);
  }, []);

  const safeSetState = (...args) => mountedRef.current && setState(...args);

  return [state, safeSetState];
}

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}
