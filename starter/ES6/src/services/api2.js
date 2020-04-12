import axios from 'axios';
export class Github {
   static async getRepositories(repo) {
    try {
      const response = await axios.get(`https://api.github.com/repos/${repo}`)
      console.log("Repositorio encontrado")
      console.log(response.data)
      
    } catch (error) {
      console.log('Falha na busca de repositorios')
    }
  }
 }

 
 export const buscaUsuario = async usuario => {
  
  try {
    const response = await axios.get(`https://api.github.com/users/${usuario}`)
      
    console.log("Usuario encontrado")
    console.log(response.data)
    
  } catch (error) {
    console.log('Falha na busca de usuario')
  }
 }
