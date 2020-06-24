import React, { useCallback, useEffect, useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { useOnEscapeKeyDown } from 'shared/hooks/onEscapeKeyDown';
import { useOnOutsideClick } from 'shared/hooks/onOutsideClick';
import { ClickableOverlay, ScrollOverlay, StyledCloseIcon, StyledModal } from './styled';

interface ModalRenderLinkProps {
  open: () => void;
}
interface ModalRenderContentProps {
  close: () => void;
}

interface ModalProps {
  width: number;
  withCloseIcon: boolean;
  isOpen?: boolean;
  backdrop?: boolean;
  onClose?: () => void;
  renderLink?: (link: ModalRenderLinkProps) => void;
  renderContent: (modal: ModalRenderContentProps) => void;
}

export function Modal({
  width = 600,
  withCloseIcon = true,
  isOpen: propsIsOpen,
  backdrop = true,
  onClose: tellParentToClose = () => {},
  renderLink = () => {},
  renderContent = () => {},
}: ModalProps) {
  const [stateIsOpen, setStateOpen] = useState(false);
  const isControlled = typeof propsIsOpen === 'boolean';
  const isOpen = !!(isControlled ? propsIsOpen : stateIsOpen);

  const $modalRef = useRef<HTMLDivElement>(null);
  const $clickableOverlayRef = useRef<HTMLDivElement>(null);

  const closeModal = useCallback(() => {
    if (!isControlled) {
      setStateOpen(false);
    } else {
      tellParentToClose();
    }
  }, [isControlled, tellParentToClose]);

  useOnOutsideClick($modalRef, isOpen, closeModal, $clickableOverlayRef);
  useOnEscapeKeyDown(isOpen, closeModal);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = 'visible';
    };
  }, [isOpen]);

  return (
    <>
      {!isControlled && renderLink({ open: () => setStateOpen(true) })}

      {isOpen &&
        ReactDOM.createPortal(
          <ScrollOverlay>
            <ClickableOverlay ref={$clickableOverlayRef} backdrop={backdrop}>
              <StyledModal width={width} ref={$modalRef}>
                {withCloseIcon && <StyledCloseIcon type="close" onClick={closeModal} />}
                {renderContent({ close: closeModal })}
              </StyledModal>
            </ClickableOverlay>
          </ScrollOverlay>,
          $root,
        )}
    </>
  );
}

const $root = document.getElementById('root') as HTMLElement;
