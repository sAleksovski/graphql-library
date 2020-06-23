import styled from 'styled-components';

export const BoardGameListWrapper = styled.div`
  box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.12);
  border-radius: 1rem;
  background-color: #fff;
`;

interface BoardGameListItemProps {
  first: boolean;
  last: boolean;
}

export const BoardGameListItem = styled.div<BoardGameListItemProps>`
  padding: 1rem 2rem;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);

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

export const BoardGameListInfo = styled.div`
  flex-grow: 1;
`;

export const Image = styled.img`
  width: 5rem;
  margin-right: 1rem;
`;

export const Title = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #495057;
  margin-bottom: 0.5rem;
`;

export const PublisherInfo = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.5rem;
`;

export const ExternalInfoLink = styled.a`
  display: inline-block;
  font-size: 0.75rem;
  margin-right: 0.5rem;
  text-decoration: none;
  color: #0079c9;
`;
