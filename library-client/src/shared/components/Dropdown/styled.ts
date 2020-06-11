import styled from 'styled-components';

export const DropdownWrapper = styled.div`
  position: relative;
`;

export const DropdownCircleMain = styled.div`
  font-weight: 500;
  font-size: 1.3rem;
  border-radius: 50%;
  cursor: pointer;

  :hover,
  :focus {
    transform: scale(1.05);
  }
`;

export const DropdownContent = styled.div`
  position: absolute;
  right: 0;
  min-width: 200px;
  margin-top: 1rem;
  padding: 0.5rem 0;
  font-size: 1rem;
  border-radius: 1rem;
  background-color: #fff;

  box-sizing: border-box;
  color: #3faffa;
  font-weight: 500;
`;

export const DropdownItem = styled.a`
  display: block;
  width: 100%;
  padding: 0.5rem 1rem;
  clear: both;
  font-weight: 400;
  color: #000;
  text-align: inherit;
  white-space: nowrap;
  background-color: transparent;
  border: 0;
  user-select: none;

  :focus,
  :hover {
    color: #000;
    text-decoration: none;
    background-color: #f2f2f2;
  }
`;
