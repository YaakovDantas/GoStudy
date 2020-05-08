import AppError from '@shared/errors/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import CreateUsersService from '@modules/users/services/CreateUsersService';

describe('CreateUsers', () => {
  it('should be able to create a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsersService = new CreateUsersService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUsersService.execute({
      email: 'this@hotm.com',
      name: 'Jhon tst',
      password: '123321',
    });

    expect(user).toHaveProperty('id');
    expect(user.email).toBe('this@hotm.com');
  });

  it('should not be able to have used email for a new user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();
    const createUsersService = new CreateUsersService(
      fakeUserRepository,
      fakeHashProvider,
    );

    await createUsersService.execute({
      email: 'this@hotm.com',
      name: 'Jhon tst',
      password: '123321',
    });

    expect(
      createUsersService.execute({
        email: 'this@hotm.com',
        name: 'Jhon tst',
        password: '123321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
