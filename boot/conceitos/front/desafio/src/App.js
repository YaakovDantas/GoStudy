import React, {useState, useEffect} from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [repositories, setRepositories] = useState([])
  const [title, setTitle] = useState([])
  
  async function handleAddRepository() {
    const response = await api.post('/repositories', {
      title,
      techs: ["PHP", "NODE", "C"],
      url: "https://github.com/yaakovDantas"
    })
    setTitle("");
    setRepositories([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    await api.delete(`/repositories/${id}`);

    const repositoriesAtt = repositories.filter(repositorie => repositorie.id !== id);
    setRepositories(repositoriesAtt);
  }
  
  async function listRepositories() {
    const response = await api.get('/repositories');
    setRepositories(response.data);
  }
  
  useEffect(()=>{
    listRepositories();
  }, [])
  return (
    <div>
      <ul data-testid="repository-list">
      {repositories.map(repository => 
          (
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
          </li>
          )
        )}
      </ul>

      <label htmlFor="">Informe um novo repositório.
        <input type="text"
          placeholder="Digite aqui."
          value={title}
          onChange={(e)=>{setTitle(e.target.value)}}
          style={{padding:"9px"}}
        />
      </label>
      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
