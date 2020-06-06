import React from 'react';
import { UserAvatar } from '../UserAvatar';
import { HeaderWrapper } from './styled';

export function Header() {
  return (
    <HeaderWrapper>
      <UserAvatar />
    </HeaderWrapper>
  );
}
