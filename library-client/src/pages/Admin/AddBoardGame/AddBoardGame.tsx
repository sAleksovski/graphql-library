import React, { useState } from 'react';
import { EmptyState } from 'shared/components/EmptyState';
import { SearchBox } from 'shared/components/SearchBox';
import { BoardGameResults } from './BoardGameResults';
import { CenterSearchBox } from './styled';

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
