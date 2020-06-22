import React, { useEffect, useState } from 'react';
import { color } from 'shared/utils/styles';
import { LoadingContainer, StyledCircle, StyledSvg } from './styled';

export function Loading() {
  const [showLoader, setShowLoader] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowLoader(true);
    }, 300);
    return () => clearTimeout(timer);
  });

  if (!showLoader) return null;

  return (
    <LoadingContainer>
      <StyledSvg preserveAspectRatio="xMinYMin meet">
        <StyledCircle cx="50%" cy="50%" fill="none" r="40%" stroke={color.primary}></StyledCircle>
      </StyledSvg>
    </LoadingContainer>
  );
}
