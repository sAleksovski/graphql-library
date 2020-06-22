import { color } from 'shared/utils/styles';
import styled from 'styled-components';

export const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2.5rem 0;
`;

export const StyledSvg = styled.svg`
  transform-origin: center center;
  animation: 2s linear infinite rotate;
  width: 4rem;
  height: 4rem;
  stroke-width: 4;
  color: ${color.primary};

  @keyframes rotate {
    100% {
      transform: rotate(360deg);
    }
  }
`;

export const StyledCircle = styled.circle`
  animation: 1.5s ease-in-out infinite dash;
  stroke-dasharray: 30;
  stroke-dashoffset: 0;
  stroke-linecap: round;

  @keyframes dash {
    0% {
      stroke-dasharray: 1%, 300%;
      stroke-dashoffset: 0;
    }
    50% {
      stroke-dasharray: 180%, 300%;
      stroke-dashoffset: -70%;
    }
    100% {
      stroke-dasharray: 180%, 300%;
      stroke-dashoffset: -248%;
    }
  }
`;
