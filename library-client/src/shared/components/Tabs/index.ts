import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

export const Tabs = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
`;

export const Tab = styled(NavLink)`
  padding: 1rem 1.5rem;
  position: relative;
  font-weight: 600;
  cursor: pointer;
  text-decoration: none;
  color: #000;

  :hover {
    ::after {
      background-color: #c5c5c5;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.25rem;
      border-radius: 0.125rem;
      content: '';
    }
  }

  &.active {
    color: #0079c9;

    ::after {
      background-color: #0079c9;
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 0.25rem;
      border-radius: 0.125rem;
      content: '';
    }
  }
`;
