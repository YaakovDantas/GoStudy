import { Request, Response } from 'express';
import createUser from './services/CreateUser'

export function hello(request: Request, response: Response) {
  const user = createUser({
    name: 'Thiago', 
    email: '111###', 
    password: 'teste@gmail.com',
    techs: ['React', 'TS', {title: 'VUE', exp: 55}]
  });

  return response.json({msg: 'HI'})
}