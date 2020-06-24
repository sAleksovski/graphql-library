import { Button } from 'shared/components/Button';
import { color } from 'shared/utils/styles';
import styled from 'styled-components';

export const BookDetailsWrapper = styled.div`
  display: flex;
  padding: 2rem;
`;

export const Image = styled.img`
  max-width: 220px;
  height: 300px;
  margin-bottom: 0.5rem;
`;

export const Left = styled.div`
  max-width: 260px;
  position: relative;
  width: 100%;
  min-height: 100%;
`;

export const LeftContent = styled.div`
  position: absolute;
  top: -100px;
  left: 1rem;
`;

export const Right = styled.div`
  max-width: calc(100% - 260px);
  position: relative;
  width: 100%;
  min-height: 100%;
`;

export const DetailsTitle = styled.h1`
  margin: 0 0 0.25rem;
`;

export const Author = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #495057;
  margin-bottom: 1rem;
`;

export const Description = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #495057;
  margin-bottom: 2rem;
  text-align: justify;
`;

export const UserLoanHistory = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  margin-bottom: 0.5rem;
`;

export const LoanItem = styled.div`
  margin-bottom: 1rem;
`;

interface LoanItemPropsDate {
  isReturned: boolean;
}

export const LoanItemDate = styled.div<LoanItemPropsDate>`
  font-size: 1rem;

  ${({ isReturned }) =>
    !isReturned &&
    `
    color: ${color.danger}
  `};
`;

export const LoanItemTitle = styled.div`
  font-size: 1.25rem;
`;

export const StyledButton = styled(Button)`
  margin-bottom: 0.5rem;
`;
