import React, { useRef, useState } from 'react';
import { useOnEscapeKeyDown } from 'shared/hooks/onEscapeKeyDown';
import { useOnOutsideClick } from 'shared/hooks/onOutsideClick';
import { DropdownCircleMain, DropdownWrapper } from './styled';
export * from './styled';

interface DropdownProps {
  children: [any, any];
}

export function Dropdown({ children }: DropdownProps) {
  const $dropdownRef = useRef<HTMLDivElement>(null);
  const [isOpen, setOpen] = useState(false);
  const closeDropdown = () => setOpen(false);

  useOnEscapeKeyDown(isOpen, closeDropdown);
  useOnOutsideClick($dropdownRef, isOpen, closeDropdown);

  const MainContent = children[0];
  const DropdownContent = children[1];

  return (
    <DropdownWrapper ref={$dropdownRef}>
      <DropdownCircleMain onClick={() => setOpen(!isOpen)}>{MainContent}</DropdownCircleMain>
      {isOpen && <div onClick={closeDropdown}>{DropdownContent}</div>}
    </DropdownWrapper>
  );
}
