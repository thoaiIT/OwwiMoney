import { useEffect } from 'react';

const useDebounce = (callback: () => void, delay: number, trigger: unknown) => {
  let idTimeout: NodeJS.Timeout;
  useEffect(() => {
    idTimeout = setTimeout(callback, delay);
    return () => clearTimeout(idTimeout);
  }, [trigger]);
};

export default useDebounce;
