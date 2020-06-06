import { Request, Response, Router } from 'express';
import { userService } from 'modules/user';
import { signToken } from './jwt';

const routes = Router();

routes.post('/login', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const sub = await userService.login({ username, password });
    const accessToken = signToken({ sub });
    res.status(200).send({ accessToken });
  } catch (error) {
    res.status(401).send({ error });
  }
});

routes.post('/register', async (req: Request, res: Response) => {
  const { username, password } = req.body;

  try {
    const sub = await userService.register({ username, password });
    const accessToken = signToken({ sub });
    res.status(200).send({ accessToken });
  } catch (error) {
    res.status(401).send({ error });
  }
});

export { routes };
