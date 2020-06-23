import React from 'react';
import { EmptyState } from 'shared/components/EmptyState';

interface BoardGameDetailsProps {
  boardGameId: number;
}

export function BoardGameDetails({ boardGameId }: BoardGameDetailsProps) {
  return (
    <EmptyState
      icon="board-game"
      title={`Details for board game with id: ${boardGameId}`}
      message="Not yet implemented. Coming soon..."
    />
  );
}
