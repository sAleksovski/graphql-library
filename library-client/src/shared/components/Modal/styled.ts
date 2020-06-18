import { color, mixin } from 'shared/utils/styles';
import styled from 'styled-components';
import { CloseIcon } from '../Icon';

export const ScrollOverlay = styled.div`
  z-index: 1000;
  position: fixed;
  top: 0;
  left: 0;
  height: 100%;
  width: 100%;
  ${mixin.scrollableY}
`;

interface StyledModalProps {
  width?: number;
}

interface ClickableOverlayProps {
  backdrop: boolean;
}

export const ClickableOverlay = styled.div<ClickableOverlayProps>`
  min-height: 100%;
  ${({ backdrop }) => backdrop && `background: rgba(9, 30, 66, 0.54);`}
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 50px;
`;

export const StyledModal = styled.div<StyledModalProps>`
  display: inline-block;
  position: relative;
  width: 100%;
  background: #fff;
  max-width: ${(props) => props.width}px;
  vertical-align: middle;
  border-radius: 1rem;
  margin-top: 2rem;
  ${mixin.boxShadowMedium}
`;

export const StyledCloseIcon = styled(CloseIcon)`
  height: 2rem;
  width: 2rem;
  z-index: 1001;
  position: absolute;
  color: ${color.textMedium};
  transition: all 0.1s;
  ${mixin.clickable}
  top: 1.5rem;
  right: 1.5rem;
  border-radius: 4px;
  &:hover {
    background: ${color.backgroundLight};
  }
`;
