import AppError from '@shared/errors/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    const user = await fakeUserRepository.create({
      name: 'thiag',
      email: '123@goja.com',
      password: '123',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFile: 'avatar.svg',
    });

    expect(user.avatar).toBe('avatar.svg');
  });

  it('should not be able to update avatar if user not exists', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    expect(
      updateUserAvatarService.execute({
        user_id: 'none',
        avatarFile: 'avatar.svg',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when updating new one', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();
    const updateUserAvatarService = new UpdateUserAvatarService(
      fakeUserRepository,
      fakeStorageProvider,
    );

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const user = await fakeUserRepository.create({
      name: 'thiag',
      email: '123@goja.com',
      password: '123',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFile: 'avatar.svg',
    });

    await updateUserAvatarService.execute({
      user_id: user.id,
      avatarFile: 'avatar2.svg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.svg');
    expect(user.avatar).toBe('avatar2.svg');
  });
});
