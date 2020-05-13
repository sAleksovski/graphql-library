import { Request, Response, Router } from 'express';
import { signToken } from './jwt';
import { localUsers } from './local-users';

const routes = Router();

routes.post('/login', (req: Request, res: Response) => {
  const { username, password } = req.body;

  if (localUsers[username] === password) {
    const accessToken = signToken({ sub: username });
    res.status(200).send({ accessToken });
  }

  res.status(401).send();
});

export { routes };
