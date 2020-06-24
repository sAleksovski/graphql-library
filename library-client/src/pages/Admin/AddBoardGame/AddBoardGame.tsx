import React, { useState } from 'react';
import { EmptyState } from 'shared/components/EmptyState';
import { ClearSearchIcon, SearchIcon } from 'shared/components/Icon';
import { BoardGameResults } from './BoardGameResults';
import { CenterSearchBox, ClearButtonWrapper, SearchBoxWrapper, SearchIconWrapper, SearchInput } from './styled';

interface SearchBoxProps {
  onSubmit: (value: string) => void;
}

function SearchBox({ onSubmit }: SearchBoxProps) {
  const [search, setSearch] = useState('');

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

export function AddBoardGame() {
  const [searchQuery, setSearchQuery] = useState('');
  function onSearch(v: string) {
    setSearchQuery(v);
  }

  return (
    <>
      <CenterSearchBox>
        <SearchBox onSubmit={onSearch} />
      </CenterSearchBox>
      {searchQuery ? (
        <BoardGameResults search={searchQuery} onSelectBoardGame={() => {}} />
      ) : (
        <EmptyState icon="search" title="Search board games" message="Search for board games to add" />
      )}
    </>
  );
}
