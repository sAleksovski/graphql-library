import { PlayersIcon, PlayingTimeIcon } from 'shared/components/Icon';
import { color, weight } from 'shared/utils/styles';
import styled from 'styled-components';

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

export const BoardGameIconInfo = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 0.25rem;
`;

export const StyledPlayingTimeIcon = styled(PlayingTimeIcon)`
  margin-right: 0.5rem;
`;

export const StyledPlayersIcon = styled(PlayersIcon)`
  margin-right: 0.5rem;
`;
