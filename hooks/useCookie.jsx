import { useState, useEffect } from 'react';
import Cookies from 'js-cookie';

export const useCookies = (key) => {
  const initial = Cookies.get(key);
  const [cookie, setCookie] = useState(initial);

  useEffect(() => {
    Cookies.set(key, cookie);
  }, [cookie, key]);

  return [cookie, setCookie];
};
