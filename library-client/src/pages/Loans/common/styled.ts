import { Button } from 'shared/components/Button';
import { Rating } from 'shared/components/Rating';
import { color } from 'shared/utils/styles';
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
