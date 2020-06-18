import { auth } from 'app/auth-helpers';
import { UserAvatar } from 'pages/common/UserAvatar';
import React from 'react';
import { useHistory } from 'react-router-dom';
import { Dropdown, DropdownContent, DropdownItem } from 'shared/components/Dropdown';
import { Badge, HeaderWrapper, Left, Link, Right, StyledBookIcon } from './styled';

export function Header() {
  const history = useHistory();

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
        <Link to="/manage-loans">
          Manage loans <Badge>3</Badge>
        </Link>
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
