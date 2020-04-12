import axios from 'axios';
export async function getUserFromGithub(user) {
  const response = await axios.get(`https://api.github.com/users/${user}`)
  
  console.log(response.data)
}
