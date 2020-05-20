import styled from 'styled-components';

export const Button = styled.button`
  background: transparent;
  border-radius: 3px;
  border: 2px solid palevioletred;
  color: palevioletred;
  padding: 0.5em 2em;
  transition: all 0.2s ease-in-out;

  :focus {
    outline: 1px solid palevioletred;
    border-radius: 0;
    background: palevioletred;
    color: white;
    transform: scale(1.05);
  }

  :hover {
    background: palevioletred;
    color: white;
    transform: scale(1.05);
  }
`;
