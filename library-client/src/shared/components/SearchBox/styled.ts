import styled from 'styled-components';

export const SearchBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 550px;
`;

export const SearchIconWrapper = styled.div`
  border-top-left-radius: 20rem;
  border-bottom-left-radius: 20rem;
  padding-right: 1rem;
  padding-left: 1rem;
  border: 1px solid #c5c5c5;
  border-right: none;
  align-items: center;
  height: calc(1.5em + 1rem);
  display: flex;
  background-color: #fff;
  color: #737373;
`;

interface SearchInputProps {
  value: string;
}

export const SearchInput = styled.input<SearchInputProps>`
  height: calc(1.5em + 1rem);
  padding: 0.5rem 1rem;
  font-size: 1rem;
  font-weight: 400;
  background-clip: padding-box;
  border: 1px solid #c5c5c5;
  border-left: 0;
  background-color: #fff;
  flex-grow: 1;

  ${({ value }) =>
    value &&
    `
    border-right: 0;
  `}

  ${({ value }) =>
    !value &&
    `
    border-top-right-radius: 20rem;
    border-bottom-right-radius: 20rem;
  `}
`;

export const ClearButtonWrapper = styled.button`
  border-top-right-radius: 20rem;
  border-bottom-right-radius: 20rem;
  padding-right: 1rem;
  padding-left: 1rem;
  border: 1px solid #c5c5c5;
  border-left: none;
  align-items: center;
  height: calc(1.5em + 1rem);
  display: flex;
  background-color: #fff;
  color: #737373;
`;
