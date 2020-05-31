import { RefObject, useEffect, useRef } from 'react';

export function useOnOutsideClick(
  $ignoredElementRefs: RefObject<HTMLDivElement>,
  isListening: boolean,
  onOutsideClick: Function,
  $listeningElementRef: RefObject<HTMLDivElement>,
) {
  const $mouseDownTargetRef: any = useRef<HTMLDivElement>(null);
  const $ignoredElementRefsMemoized: any = [$ignoredElementRefs].flat();

  useEffect(() => {
    const handleMouseDown = (event: any) => {
      $mouseDownTargetRef.current = event.target;
    };

    const handleMouseUp = (event: any) => {
      const isAnyIgnoredElementAncestorOfTarget = $ignoredElementRefsMemoized.some(
        ($elementRef: any) =>
          $elementRef.current.contains($mouseDownTargetRef.current) || $elementRef.current.contains(event.target),
      );
      if (event.button === 0 && !isAnyIgnoredElementAncestorOfTarget) {
        onOutsideClick();
      }
    };

    const $listeningElement = ($listeningElementRef || {}).current || document;

    if (isListening) {
      $listeningElement.addEventListener('mousedown', handleMouseDown);
      $listeningElement.addEventListener('mouseup', handleMouseUp);
    }
    return () => {
      $listeningElement.removeEventListener('mousedown', handleMouseDown);
      $listeningElement.removeEventListener('mouseup', handleMouseUp);
    };
  }, [$ignoredElementRefsMemoized, $listeningElementRef, isListening, onOutsideClick]);
}
