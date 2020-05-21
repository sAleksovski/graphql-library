import React from 'react';
import { StarEmpty, StarFull, StarHalf } from './Star';

interface RatingProps {
  rating: number;
}

export function Rating({ rating }: RatingProps) {
  const full = Math.floor(rating);
  const half = rating % 1 > 0.2 ? 1 : 0;
  const empty = 5 - full - half;
  return (
    <>
      {Array.from({ length: full }).map((_: any, index: number) => (
        <StarFull fill="#fdd835" key={`star-full-${index}`} />
      ))}
      {Array.from({ length: half }).map((_: any, index: number) => (
        <StarHalf fill="#fdd835" key={`star-half-${index}`} />
      ))}
      {Array.from({ length: empty }).map((_: any, index: number) => (
        <StarEmpty fill="#fdd835" key={`star-empty-${index}`} />
      ))}
    </>
  );
}
