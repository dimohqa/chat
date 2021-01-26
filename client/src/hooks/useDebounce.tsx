import { useEffect, useState } from 'react';

export const useDebounce = (value: string, delay: number) => {
  const [debounceSearchValue, setDebouncedSearchValue] = useState(value);
  const [searchStatus, setSearchStatus] = useState<boolean>(false);
  const [componentIsMount, setMountStatus] = useState<boolean>(true);

  useEffect(() => {
    const handler = setTimeout(() => {
      if (componentIsMount) {
        setMountStatus(false);

        return;
      }

      setSearchStatus(true);
      setDebouncedSearchValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [searchStatus, value]);

  return { debounceSearchValue, searchStatus };
};
