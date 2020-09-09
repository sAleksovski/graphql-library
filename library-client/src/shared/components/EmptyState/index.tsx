import React from 'react';
import { BoardGameIcon, BookIcon, LoanIcon, SearchIcon, UnknownErrorIcon } from '../Icon';
import { EmptyStateContainer, IconContainer, Message, Title } from './styled';

interface EmptyStateProps {
  icon: 'book' | 'board-game' | 'search' | 'loan' | 'error';
  title: string;
  message: string;
}

const IconMap = {
  book: () => <BookIcon size={48} />,
  'board-game': () => <BoardGameIcon size={48} />,
  search: () => <SearchIcon size={48} />,
  loan: () => <LoanIcon size={48} />,
  error: () => <UnknownErrorIcon size={48} />,
  default: () => <UnknownErrorIcon size={48} />,
};

export function EmptyState({ icon, title, message }: EmptyStateProps) {
  const Icon = IconMap[icon] || IconMap.default;
  return (
    <EmptyStateContainer>
      <IconContainer>
        <Icon />
      </IconContainer>
      <Title>{title}</Title>
      <Message>{message}</Message>
    </EmptyStateContainer>
  );
}
