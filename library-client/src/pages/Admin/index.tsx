import React from 'react';
import { AddBoardGame } from './AddBoardGame';
import { AdminPageWraper } from './styled';

export function AdminPage() {
  return (
    <AdminPageWraper>
      <AddBoardGame />
    </AdminPageWraper>
  );
}
