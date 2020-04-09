interface TechObjects {
  title: string;
  exp: number;
}

interface CreateUserData{
  name?: string;
  email: string;
  password: string;
  techs: Array<string | TechObjects>;
}

export default function createUser({name, email, password}: CreateUserData) {
  const user = {
    name,
    email, 
    password
  };

  return user;
}