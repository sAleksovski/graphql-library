import React from 'react';
import { ApprovedIcon, FinishedIcon, PendingIcon, RejectedIcon } from 'shared/components/Icon';
import { color } from 'shared/utils/styles';
import styled from 'styled-components';

const LoanStatusIconMap = {
  LOAN_REQUESTED: () => <PendingIcon color={color.warning} size={24} />,
  LOAN_APPROVED: () => <ApprovedIcon color={color.success} size={24} />,
  LOAN_REJECTED: () => <RejectedIcon color={color.danger} size={24} />,
  LOAN_FINISHED: () => <FinishedIcon color={color.textLight} size={24} />,
};

export function LoanStatusIcon({
  status,
}: {
  status: 'LOAN_REQUESTED' | 'LOAN_APPROVED' | 'LOAN_REJECTED' | 'LOAN_FINISHED';
}) {
  const Icon = LoanStatusIconMap[status];

  return <Icon />;
}

export const RejectReason = styled.div`
  color: ${color.danger};
`;
