import { NavLink } from 'react-router-dom';
import { BookIcon } from 'shared/components/Icon';
import { color } from 'shared/utils/styles';
import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
`;

export const Left = styled.div``;

export const Right = styled.div`
  display: flex;
`;

export const Link = styled(NavLink)`
  margin-right: 1.5rem;
  font-weight: 600;
  text-decoration: none;
  color: ${color.textLink};
  align-items: center;
  display: flex;
`;

export const Badge = styled.span`
  margin-left: 0.5rem;
  font-weight: 600;
  line-height: 1.2;
  border-radius: 20rem;
  padding: 0.25rem 0.5rem;
  font-size: 0.75rem;
  background-color: ${color.textLink};
  color: #fff;
`;

export const StyledBookIcon = styled(BookIcon)`
  margin-right: 0.5rem;
`;
