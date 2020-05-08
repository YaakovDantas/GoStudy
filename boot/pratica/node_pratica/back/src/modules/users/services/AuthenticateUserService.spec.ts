import AppError from '@shared/errors/AppError';

import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/providers/HashProvider/fakes/FakeHashProvider';
import AuthenticateUserService from '@modules/users/services/AuthenticateUserService';
import CreateUsersService from '@modules/users/services/CreateUsersService';

describe('AutenticateUser', () => {
  it('should be able to autenticate a user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUsersService = new CreateUsersService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    const user = await createUsersService.execute({
      email: 'this@hotm.com',
      name: 'Jhon tst',
      password: '123321',
    });

    const response = await authenticateUserService.execute({
      email: 'this@hotm.com',
      password: '123321',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to autenticate witn non existing user', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    expect(
      authenticateUserService.execute({
        email: 'this@hotm.com',
        password: '123321',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });

  it('should not be able to autenticate a user with wrong password', async () => {
    const fakeUserRepository = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUsersService = new CreateUsersService(
      fakeUserRepository,
      fakeHashProvider,
    );
    const authenticateUserService = new AuthenticateUserService(
      fakeUserRepository,
      fakeHashProvider,
    );

    createUsersService.execute({
      email: 'this@hotm.com',
      name: 'Jhon tst',
      password: '123321',
    });

    expect(
      authenticateUserService.execute({
        email: 'this@hotm.com',
        password: '22',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
