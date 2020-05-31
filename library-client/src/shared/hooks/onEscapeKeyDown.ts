import { useEffect } from 'react';
import { KeyCodes } from 'shared/constants/keyCodes';

export function useOnEscapeKeyDown(isListening: boolean, onEscapeKeyDown: Function) {
  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.keyCode === KeyCodes.ESCAPE) {
        onEscapeKeyDown();
      }
    };

    if (isListening) {
      document.addEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isListening, onEscapeKeyDown]);
}
