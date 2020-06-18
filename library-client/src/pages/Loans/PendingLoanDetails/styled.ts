import { Button } from 'shared/components/Button';
import { Input } from 'shared/components/Form';
import { Rating } from 'shared/components/Rating';
import { color } from 'shared/utils/styles';
import styled from 'styled-components';

export const BookDetailsWrapper = styled.div`
  display: flex;
  padding: 2rem;
`;

export const Image = styled.img`
  height: 300px;
  margin-bottom: 0.5rem;
`;

export const StyledRating = styled(Rating)`
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

export const Title = styled.h1`
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

interface LoanItemProps {
  isReturned: boolean;
}

export const LoanItem = styled.div<LoanItemProps>`
  font-size: 1rem;
  margin-bottom: 0.25rem;

  ${({ isReturned }) =>
    !isReturned &&
    `
    color: ${color.danger}
  `};
`;

export const StyledButton = styled(Button)`
  margin-bottom: 0.5rem;
`;

export const RejectLoanDialog = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;
`;

export const RejectLoanDialogTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const StyledInput = styled(Input)`
  margin-bottom: 1rem;
`;

export const ButtonBar = styled.div`
  display: flex;
  justify-content: flex-end;
`;
