import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { Avatar } from 'shared/components/Avatar';
import { HeaderWrapper } from './styled';

const GET_USER_INFO = gql`
  query User {
    userInfo {
      id
      name
      avatarUrl
    }
  }
`;

export function Header() {
  const { loading, error, data } = useQuery(GET_USER_INFO);

  if (loading || error) return null;

  return (
    <HeaderWrapper>
      <Avatar avatarUrl={data.userInfo.avatarUrl} name={data.userInfo.name} />
    </HeaderWrapper>
  );
}
