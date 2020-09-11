import { Request, Response } from 'express';

import { container } from 'tsyringe';

import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const avatarService = container.resolve(UpdateUserAvatarService);

    const user = await avatarService.execute({
      user_id: request.user.id,
      avatarFile: request.file.filename,
    });

    return response.json(user);
  }
}