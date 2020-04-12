import ClasseUsuario, {idade as IdadeUsuario} from "./modulo2";
import {umPorSegundo} from "./modulo3";
import {getUserFromGithub} from './services/api'
import {Github, buscaUsuario} from './services/api2'

ClasseUsuario.info()
console.log(IdadeUsuario)

umPorSegundo();

getUserFromGithub('diego3g');
getUserFromGithub('diego3g124123');

Github.getRepositories('rocketseat/rocketseat.com.br');
Github.getRepositories('rocketseat/dslkvmskv');

buscaUsuario('diego3g');