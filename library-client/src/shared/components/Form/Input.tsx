import styled from 'styled-components';

export const Input = styled.input`
  box-sizing: border-box;
  border: 1px solid #d5dae2;
  padding: 1rem 1.25rem;
  margin-bottom: 1.5rem;
  min-height: 3rem;
  font-size: 1rem;
  line-height: 15;
  font-weight: normal;
  display: block;
  width: 100%;
  height: calc(1.5em + 0.75rem + 2px);
  color: #495057;
  background-color: #fff;
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;

  :focus {
    color: #495057;
    background-color: #fff;
    border-color: #80bdff;
    outline: 0;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;
