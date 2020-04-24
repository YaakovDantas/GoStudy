import { Router } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const service = new AuthenticateUserService();

  const { user, token } = await service.execute(request.body);

  return response.json({ user, token });
});

export default sessionsRouter;
