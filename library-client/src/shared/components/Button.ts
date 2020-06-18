import { color } from 'shared/utils/styles';
import styled from 'styled-components';

type ButtonType = 'primary' | 'success' | 'danger' | 'warning' | 'secondary';

interface ButtonProps {
  block?: boolean;
  disabled?: boolean;
  color?: ButtonType;
}

const getColor = (type: ButtonType | undefined) => (type ? color[type] : 'palevioletred');

export const Button = styled.button<ButtonProps>`
  background: transparent;
  border-radius: 3px;
  border: 2px solid ${({ color }) => getColor(color)};
  color: ${({ color }) => getColor(color)};
  padding: 0.5em 2em;
  transition: all 0.2s ease-in-out;
  ${(props) =>
    props.block &&
    `
    display: block;
    width: 100%;
  `}
  ${(props) =>
    props.disabled &&
    `
    cursor: not-allowed;
  `}

  :focus {
    outline: 1px solid ${({ color }) => getColor(color)};
    border-radius: 0;
    background: ${({ color }) => getColor(color)};
    color: white;
    transform: scale(1.05);
  }

  :hover {
    background: ${({ color }) => getColor(color)};
    color: white;
    transform: scale(1.05);
  }
`;
