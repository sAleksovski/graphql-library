import React from 'react';
import { Image, Letter } from './styled';

interface AvatarProps {
  avatarUrl?: string;
  name?: string;
}

export function Avatar({ avatarUrl, name }: AvatarProps) {
  if (avatarUrl) {
    return <Image avatarUrl={avatarUrl} />;
  }

  return (
    <Letter color="#DA7657">
      <span>{name ? name[0] : '?'}</span>
    </Letter>
  );
}
