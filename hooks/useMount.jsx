import { useEffect } from 'react';

export const useMount = (func) => {
  useEffect(() => func(), []);
};

export const useUnmount = (func) => {
  useEffect(() => func, []);
};
