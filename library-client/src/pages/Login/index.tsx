import { auth } from 'app/auth-helpers';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { Button } from 'shared/components/Button';
import { Input } from 'shared/components/Form';
import { Column, Columns } from 'shared/components/Grid';
import reading from './reading.jpg';
import {
  Card,
  CardBody,
  CenterContent,
  Container,
  Footer,
  FormContainer,
  FormGroup,
  Image,
  Label,
  LoginError,
  LoginRegisterToggle,
  LoginText,
} from './styled';

export function LoginPage() {
  const history = useHistory();
  const location = useLocation<{ from: { pathname: string } }>();
  const { from } = location.state || { from: { pathname: '/' } };

  const [isLogin, setIsLogin] = useState(true);
  const [name, setName] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [repeatPassword, setRepeatPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  if (auth.isAuthenticated()) {
    history.replace(from);
  }

  function doAction() {
    if (!isLogin && password !== repeatPassword) return;
    const action = isLogin ? 'login' : 'register';
    auth[action]({ username, password, ...(!isLogin && { name }) })
      .then(() => {
        history.replace(from);
      })
      .catch(({ error: { message } }) => setLoginError(message));
  }

  function keyPress(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      doAction();
    }
  }

  function toggleAction() {
    setIsLogin(!isLogin);
    setLoginError('');
    setUsername('');
    setPassword('');
    setRepeatPassword('');
    setName('');
  }

  return (
    <CenterContent>
      <Container>
        <Card>
          <Columns>
            <Column width={40}>
              <Image src={reading} />
            </Column>
            <Column width={60}>
              <CardBody>
                <FormContainer>
                  {isLogin && <LoginText>Please sign in</LoginText>}
                  {!isLogin && <LoginText>Please sign up</LoginText>}
                  {loginError && <LoginError>{loginError}</LoginError>}

                  {!isLogin && (
                    <FormGroup>
                      <Label>Name:</Label>
                      <Input type="text" value={name} onChange={(e) => setName(e.target.value)}></Input>
                    </FormGroup>
                  )}

                  <FormGroup>
                    <Label>Username:</Label>
                    <Input
                      type="text"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      onKeyPress={keyPress}
                    ></Input>
                  </FormGroup>

                  <FormGroup>
                    <Label>Password:</Label>
                    <Input
                      type="password"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      onKeyPress={keyPress}
                    ></Input>
                  </FormGroup>

                  {!isLogin && (
                    <FormGroup>
                      <Label>Repeat password:</Label>
                      <Input
                        type="password"
                        value={repeatPassword}
                        onChange={(e) => setRepeatPassword(e.target.value)}
                        onKeyPress={keyPress}
                      ></Input>

                      {password && repeatPassword && password !== repeatPassword && (
                        <LoginError>Passwords must match</LoginError>
                      )}
                    </FormGroup>
                  )}

                  <LoginRegisterToggle onClick={toggleAction}>
                    {isLogin ? 'Sign up instead' : 'Sign in instead'}
                  </LoginRegisterToggle>

                  <Footer>
                    <Button onClick={doAction}>{isLogin ? 'Sign in' : 'Sign up'}</Button>
                  </Footer>
                </FormContainer>
              </CardBody>
            </Column>
          </Columns>
        </Card>
      </Container>
    </CenterContent>
  );
}
