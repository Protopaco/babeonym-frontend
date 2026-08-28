import { useMemo, useState } from 'react';

type Props<T> = {
  filterItems: (items: T[], searchValue: string) => T[];
  items: T[];
};

export const useNestedFilterSearch = <T,>({ filterItems, items }: Props<T>) => {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value.replace(/[^\p{L}]/gu, ''));
  };

  const displayItems = useMemo(() => {
    if (searchValue === '') {
      return items;
    }

    return filterItems(items, searchValue.toLowerCase());
  }, [filterItems, items, searchValue]);

  return {
    displayItems,
    handleSearchChange,
  };
};
