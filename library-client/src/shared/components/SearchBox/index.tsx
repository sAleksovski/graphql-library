import React, { useEffect, useState } from 'react';
import { ClearSearchIcon, SearchIcon } from '../Icon';
import { ClearButtonWrapper, SearchBoxWrapper, SearchIconWrapper, SearchInput } from './styled';

interface SearchBoxProps {
  value?: string;
  onSubmit: (value: string) => void;
}

export function SearchBox({ onSubmit, value }: SearchBoxProps) {
  const [search, setSearch] = useState('');

  useEffect(() => {
    setSearch(value || '');
  }, [value]);

  function keyPress(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      onSubmit(search);
    }
  }

  function clear() {
    setSearch('');
    onSubmit('');
  }

  return (
    <SearchBoxWrapper>
      <SearchIconWrapper>
        <SearchIcon size={24} />
      </SearchIconWrapper>
      <SearchInput type="text" value={search} onChange={(e) => setSearch(e.target.value)} onKeyPress={keyPress} />
      {search && (
        <ClearButtonWrapper onClick={clear}>
          <ClearSearchIcon size={16} />
        </ClearButtonWrapper>
      )}
    </SearchBoxWrapper>
  );
}
