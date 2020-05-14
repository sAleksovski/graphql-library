import { auth } from 'app/auth-helpers';
import { Button } from 'components/Button';
import { Column, Columns } from 'components/Grid';
import React, { useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import reading from './reading.jpg';
import {
  Card,
  CardBody,
  CenterContent,
  Container,
  Footer,
  FormContainer,
  Image,
  Input,
  Label,
  LoginError,
  LoginText,
} from './styles';

export function LoginPage() {
  const history = useHistory();
  const location = useLocation<{ from: { pathname: string } }>();
  const { from } = location.state || { from: { pathname: '/' } };

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState(false);

  if (auth.isAuthenticated()) {
    history.replace(from);
  }

  function login() {
    auth
      .login({ username, password })
      .then(() => {
        history.replace(from);
      })
      .catch(() => setLoginError(true));
  }

  function keyPress(event: React.KeyboardEvent) {
    if (event.key === 'Enter') {
      login();
    }
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
                  <LoginText>Please sign in</LoginText>
                  {loginError && <LoginError>Invalid username or password</LoginError>}

                  <Label>Username:</Label>
                  <Input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    onKeyPress={keyPress}
                  ></Input>

                  <Label>Password</Label>
                  <Input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onKeyPress={keyPress}
                  ></Input>

                  <Footer>
                    <Button onClick={login}>Sign in</Button>
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
