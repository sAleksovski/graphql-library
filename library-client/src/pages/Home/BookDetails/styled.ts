import { color, weight } from 'shared/utils/styles';
import styled from 'styled-components';

export const BookDetailsWrapper = styled.div`
  display: flex;
  padding: 2rem;
`;

export const Image = styled.img`
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

export const CommentSection = styled.div``;

export const Comment = styled.div`
  display: flex;
  margin-bottom: 1.5rem;
`;

export const CommentLeft = styled.div`
  margin-right: 1rem;
`;

interface CommentMainProps {
  hideBorder?: boolean;
}

export const CommentMain = styled.div<CommentMainProps>`
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

export const CommentUser = styled.div`
  color: ${color.textDark};
  font-weight: ${weight.bold};
  font-size: 1.25rem;
  margin-bottom: 0.25rem;
`;

export const CommentContent = styled.div`
  font-size: 1rem;
  font-weight: 500;
  color: #495057;
  margin-bottom: 0.5rem;
  text-align: justify;
`;

export const CommentDate = styled.small`
  color: ${color.textMedium};
`;
