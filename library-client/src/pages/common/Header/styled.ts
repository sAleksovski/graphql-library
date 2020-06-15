import { NavLink } from 'react-router-dom';
import { color } from 'shared/utils/styles';
import styled from 'styled-components';

export const HeaderWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding: 1rem;
`;

export const Link = styled(NavLink)`
  padding: 1rem 1.5rem;
  font-weight: 600;
  text-decoration: none;
  color: ${color.textLink};
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
