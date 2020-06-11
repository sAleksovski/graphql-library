import styled from 'styled-components';

export const CenterContent = styled.div`
  min-height: 100vh;
  align-items: center;
  display: flex;
`;

export const Container = styled.div`
  max-width: 1110px;
  margin: 0 auto;
  width: 100%;
`;

export const Card = styled.div`
  border-radius: 2rem;
  box-shadow: 0 10px 30px 0 rgba(172, 168, 168, 0.43);
  overflow: hidden;
  position: relative;
  display: flex;
  flex-direction: column;
  min-width: 0;
  word-wrap: break-word;
  background-color: #fff;
  background-clip: border-box;
  height: 70vh;
  min-height: 500px;
  flex: 1;
`;

export const CardBody = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 100%;
`;

export const Image = styled.img`
  border-radius: 0;
  position: absolute;
  width: 100%;
  height: 100%;
  min-height: 100%;
  object-fit: cover;
`;

export const FormContainer = styled.div`
  width: 100%;
  padding: 0 5rem;
`;

export const LoginText = styled.div`
  font-size: 2rem;
  color: #000;
  font-weight: normal;
  margin-bottom: 1rem;
`;

export const FormGroup = styled.div`
  margin-bottom: 1.5rem;
`;

export const Label = styled.div`
  color: rgb(94, 108, 132);
  margin-bottom: 0.25rem;
`;

export const LoginError = styled(Label)`
  color: red;
`;

export const LoginRegisterToggle = styled.a`
  cursor: pointer;
  color: #0747a6;
`;

export const Footer = styled.div`
  display: flex;
  justify-content: flex-end;
`;
