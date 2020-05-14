import styled from 'styled-components';

export const Columns = styled.div`
  display: flex;
  min-height: 100%;
`;

interface ColumnProps {
  width: number;
}

export const Column = styled.div<ColumnProps>`
  max-width: ${(props) => props.width}%;
  position: relative;
  width: 100%;
  min-height: 100%;
`;
