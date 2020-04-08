// 1

class Admin {
  constructor(email, senha){
    this.email = email;
    this.senha = senha;
    this.admin = true;
  }

  isAdmin() {
    return this.admin;
  }
}

class Usuario extends Admin{
  constructor(email, senha) {
    super(email, senha);
  }

  isAdmin() {
    return false;
  }
}


const User1 = new Usuario('email@teste.com', 'senha123');
const Adm1 = new Admin('email@teste.com', 'senha123');
console.log(User1.isAdmin());
console.log(Adm1.isAdmin());

// 2

const usuarios = [
  { nome: 'Diego', idade: 23, empresa: 'Rocketseat' },
  { nome: 'Gabriel', idade: 15, empresa: 'Rocketseat' },
  { nome: 'Lucas', idade: 30, empresa: 'Facebook' },
];

const idades = usuarios.map(usuario => usuario.idade)
console.log(idades)

const funcionario = usuarios.filter(usuario => usuario.idade >= 18 && usuario.empresa === 'Rocketseat')
console.log(funcionario)

const google = usuarios.find(usuario => usuario.empresa === 'Google')
console.log(google)

const soma_idades = usuarios.reduce((total, usuario) => usuario.idade)
console.log(soma_idades)


const usuarios_50 = usuarios.map(usuario => ({...usuario, idade: usuario.idade * 2})).filter(usuario => usuario.idade <= 50);
console.log(usuarios_50)

// 3

const arr = [1, 2, 3, 4, 5];
arr.map(item => item + 10);

const usuario = { nome: 'Diego', idade: 23 };
const mostraIdade = usuario => usuario.idade
mostraIdade(usuario);

let nomeUsuario = "Diego";
const idade = 23;
const mostraUsuario = (nome = 'Diego', idade = 18) => ({ nome, idade });
mostraUsuario(nomeUsuario, idade);
mostraUsuario(nomeUsuario);

const promise = () => {
  return new Promise((resolve, reject) => {
  return resolve();
  })
}

// 4

const empresa = {
  nome: 'Rocketseat',
  endereco: {
  cidade: 'Rio do Sul',
  estado: 'SC',
  }
};

let {nome, endereco: {cidade, estado}} = empresa;

console.log(nome); // Rocketseat
console.log(cidade); // Rio do Sul
console.log(estado); // SC

function mostraInfo({nome, idade}) {
  console.log( `${nome} tem ${idade} anos.`);
}

mostraInfo({ nome: 'Diego', idade: 23 })

// 5

const arr2 = [1, 2, 3, 4, 5, 6];
const [x, ...y] = arr2;

console.log(x); // 1
console.log(y); // [2, 3, 4, 5, 6]

const usuarioSpread = {
  nome: 'Diego',
  idade: 23,
  endereco: {
  cidade: 'Rio do Sul',
  uf: 'SC',
  pais: 'Brasil',
  }
};

const usuarioGabriel = { ...usuarioSpread, nome: "Gabriel" }
console.log(usuarioGabriel)

const usuarioLontras = { ...usuarioSpread, endereco: {...usuarioSpread.endereco,cidade: "Lontras"} }
console.log(usuarioLontras)

// 6

const usuario = 'Diego';
const idade = 23;
console.log(`O usuário ${usuario} possui ${idade} anos`);

// 7

const nome = 'Diego';
const idade = 23;
const usuario = {
 nome,
 idade,
 cidade: 'Rio do Sul',
};