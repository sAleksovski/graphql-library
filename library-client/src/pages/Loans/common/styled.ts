import { Button } from 'shared/components/Button';
import { color } from 'shared/utils/styles';
import styled from 'styled-components';

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
