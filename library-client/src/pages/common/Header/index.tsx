import { useLazyQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import { auth } from 'app/auth-helpers';
import { UserAvatar } from 'pages/common/UserAvatar';
import React, { useCallback, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown, DropdownContent, DropdownItem } from 'shared/components/Dropdown';
import { PubSub } from 'shared/utils';
import { Badge, HeaderWrapper, Left, Link, Right, StyledBookIcon } from './styled';

const REFRESH_PENDING_LOANS_COUNT = 'REFRESH_PENDING_LOANS_COUNT';

export const refreshPendingLoansCount = () => PubSub.emit(REFRESH_PENDING_LOANS_COUNT);

const GET_PENDING_LOANS_COUNT = gql`
  query PendingLoansCount {
    pendingLoansCount
  }
`;

export function Header() {
  const history = useHistory();

  const [fetchPendingLoans, { loading, error, data, refetch }] = useLazyQuery(GET_PENDING_LOANS_COUNT);

  useEffect(() => {
    if (auth.isAdmin()) {
      fetchPendingLoans();
    }
  }, [fetchPendingLoans]);

  const refetchPendingLoansCount = useCallback(() => {
    if (auth.isAdmin()) {
      refetch();
    }
  }, [refetch]);

  useEffect(() => {
    PubSub.on(REFRESH_PENDING_LOANS_COUNT, refetchPendingLoansCount);

    return () => PubSub.off(REFRESH_PENDING_LOANS_COUNT, refetchPendingLoansCount);
  }, [refetchPendingLoansCount]);

  function logOut() {
    auth.logout();
    history.push('/');
  }

  return (
    <HeaderWrapper>
      <Left>
        <Link to="/">
          <StyledBookIcon size={32} /> Home
        </Link>
      </Left>

      <Right>
        {auth.isAdmin() && <Link to="/admin">Admin</Link>}
        <Link to="/loans">Loans {!loading && !error && data && <Badge>{data.pendingLoansCount}</Badge>}</Link>
        <Dropdown>
          <UserAvatar />
          <DropdownContent>
            <DropdownItem onClick={logOut}>Log out</DropdownItem>
          </DropdownContent>
        </Dropdown>
      </Right>
    </HeaderWrapper>
  );
}
