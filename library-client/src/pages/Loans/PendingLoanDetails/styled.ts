import { Input } from 'shared/components/Form';
import styled from 'styled-components';

export const RejectLoanDialog = styled.div`
  display: flex;
  padding: 2rem;
  flex-direction: column;
`;

export const RejectLoanDialogTitle = styled.div`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
`;

export const StyledInput = styled(Input)`
  margin-bottom: 1rem;
`;

export const ButtonBar = styled.div`
  display: flex;
  justify-content: flex-end;
`;
