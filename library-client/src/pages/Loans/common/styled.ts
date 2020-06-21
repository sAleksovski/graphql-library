import styled from 'styled-components';

export const LoanListWrapper = styled.div`
  box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.12);
  border-radius: 1rem;
  background-color: #fff;
`;

interface LoanListItemProps {
  first: boolean;
  last: boolean;
}

export const LoanListItem = styled.div<LoanListItemProps>`
  padding: 1rem 2rem;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  align-items: center;

  ${(props) =>
    props.first &&
    `
    border-top-left-radius: 1rem;
    border-top-right-radius: 1rem;
  `};

  ${(props) =>
    props.last &&
    `
    border-bottom-left-radius: 1rem;
    border-bottom-right-radius: 1rem;
    border-bottom: 0;
  `};

  :hover {
    background-color: #f8f9fa;
    cursor: pointer;
  }
`;

export const LoanInfo = styled.div`
  flex-grow: 1;
  margin-left: 1rem;
`;

export const Title = styled.div`
  font-size: 1.1rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 0.25rem;
`;

export const LoanDate = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #495057;
`;
