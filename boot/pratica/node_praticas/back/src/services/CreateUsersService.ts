import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '../models/User';
import AppError from '../errors/AppError';

interface Request {
  name: string;
  email: string;
  password: string;
}

export default class CreateUserService {
  // eslint-disable-next-line class-methods-use-this
  public async execute({ email, name, password }: Request): Promise<User> {
    const repository = getRepository(User);

    const checkUserExists = await repository.findOne({ where: { email } });

    if (checkUserExists) {
      throw new AppError('This user already exists with this email');
    }

    const hashedPassword = await hash(password, 8);

    const user = repository.create({
      email,
      name,
      password: hashedPassword,
    });

    await repository.save(user);

    return user;
  }
}
