import React from 'react';
import { color, weight } from 'shared/utils/styles';
import styled from 'styled-components';
import { BoardGameIcon, BookIcon } from './Icon';
import { Rating } from './Rating';

export const LibraryList = styled.div`
  box-shadow: 0px 4px 9px 0px rgba(0, 0, 0, 0.12);
  border-radius: 1rem;
  background-color: #fff;
`;

interface LibraryListItemProps {
  first: boolean;
  last: boolean;
  centerItems?: boolean;
}

export const LibraryListItem = styled.div<LibraryListItemProps>`
  padding: 1rem 2rem;
  display: flex;
  border-bottom: 1px solid rgba(0, 0, 0, 0.125);
  ${({ centerItems }) =>
    centerItems &&
    `
  align-items: center;
  `}

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

export const LibraryListItemLeft = styled.div`
  margin-right: 1rem;
`;

export const LibraryListItemImage = styled.img`
  width: 5rem;
`;

export const LibraryListItemContent = styled.div`
  flex-grow: 1;
`;

export const LibraryListItemTitle = styled.div`
  font-size: 1.5rem;
  font-weight: 600;
  color: #495057;
`;

interface LibraryListItemSubtitleProps {
  noMargin?: boolean;
}

export const LibraryListItemSubtitle = styled.div<LibraryListItemSubtitleProps>`
  font-size: 1rem;
  font-weight: 500;
  color: #495057;
  ${({ noMargin }) =>
    !noMargin &&
    `
    margin-bottom: 0.5rem;
  `}
  display: flex;
  align-items: center;
`;

export const LibraryListItemIconSubtitle = styled(LibraryListItemSubtitle)`
  margin-bottom: 0.25rem;
`;

export const LibraryListItemIconWrapper = styled.div`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
`;

interface LibraryListItemIconProps {
  type: 'BOOK' | 'BOARD_GAME';
}

const LibraryItemIconMap = {
  BOOK: () => <BookIcon size={24} />,
  BOARD_GAME: () => <BoardGameIcon size={24} />,
};

export const LibraryListItemIcon = ({ type }: LibraryListItemIconProps) => {
  const Icon = LibraryItemIconMap[type];

  return <Icon />;
};

export const LibraryListItemExternalInfoLink = styled.a`
  display: inline-block;
  font-size: 0.75rem;
  margin-right: 0.5rem;
  text-decoration: none;
  color: #0079c9;
`;

export const LibraryItemDetails = styled.div`
  display: flex;
  padding: 2rem;
`;

export const LibraryItemDetailsLeft = styled.div`
  max-width: 260px;
  position: relative;
  width: 100%;
  min-height: 100%;
`;

export const LibraryItemDetailsLeftContent = styled.div`
  position: absolute;
  top: -100px;
  left: 1rem;
`;

export const LibraryItemDetailsImage = styled.img`
  height: 300px;
  max-width: 220px;
  margin-bottom: 0.5rem;
`;

export const LibraryItemDetailsStyledRating = styled(Rating)`
  margin-bottom: 0.5rem;
`;

export const LibraryItemDetailsRight = styled.div`
  max-width: calc(100% - 260px);
  position: relative;
  width: 100%;
  min-height: 100%;
`;

export const LibraryItemDetailsTitle = styled.h1`
  margin: 0 0 0.25rem;
`;

export const LibraryItemDetailsSubtitle = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #495057;
  margin-bottom: 1rem;
`;

export const LibraryItemDetailsIconSubtitle = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
  color: #495057;
`;

export const LibraryItemDetailsIconWrapper = styled.div`
  margin-right: 0.5rem;
  display: flex;
  align-items: center;
`;

export const LibraryItemDetailsDescription = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #495057;
  margin-bottom: 2rem;
  text-align: justify;
`;

export const LibraryItemDetailsCommentSection = styled.div``;

export const LibraryItemDetailsComment = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

export const LibraryItemDetailsCommentLeft = styled.div`
  margin-right: 1rem;
`;

interface LibraryItemDetailsCommentMainProps {
  hideBorder?: boolean;
}

export const LibraryItemDetailsCommentMain = styled.div<LibraryItemDetailsCommentMainProps>`
  display: flex;
  flex-direction: column;
  ${({ hideBorder }) =>
    !hideBorder &&
    `
      border-bottom: 1px solid ${color.borderLightest};
      padding-bottom: 1rem;
  `};
  display: flex;
  flex-grow: 1;
`;

export const LibraryItemDetailsCommentUser = styled.div`
  color: ${color.textDark};
  font-weight: ${weight.bold};
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
`;

export const LibraryItemDetailsCommentContent = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.5rem;
  text-align: justify;
`;

export const LibraryItemDetailsCommentDate = styled.small`
  color: ${color.textMedium};
`;
