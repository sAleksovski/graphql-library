import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { Avatar } from 'shared/components/Avatar';

const GET_USER_INFO = gql`
  query User {
    userInfo {
      id
      name
      avatarUrl
    }
  }
`;

export function UserAvatar() {
  const { loading, error, data } = useQuery(GET_USER_INFO);

  if (loading || error) return null;

  return <Avatar avatarUrl={data.userInfo.avatarUrl} name={data.userInfo.name} />;
}
