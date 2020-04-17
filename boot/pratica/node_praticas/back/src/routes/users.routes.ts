import { Router } from 'express';
import multer from 'multer';
import CreateUserService from '../services/CreateUsersService';
import UpdateUserAvatarService from '../services/UpdateUserAvatarService';
import ensureAuthenticated from '../middleware/ensureAuthenticated';
import uploadConfig from '../config/upload';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.post('/', async (request, response) => {
  const createUser = new CreateUserService();

  const user = await createUser.execute(request.body);

  delete user.password;

  return response.json(user);
});

usersRouter.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  async (request, response) => {
    // console.log(request.file);
    const avatarService = new UpdateUserAvatarService();

    const user = await avatarService.execute({
      user_id: request.user.id,
      avatarFile: request.file.filename,
    });

    return response.json(user);
  },
);

export default usersRouter;
