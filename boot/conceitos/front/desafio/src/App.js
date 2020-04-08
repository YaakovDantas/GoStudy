import React, {useState, useEffect} from "react";
import api from "./services/api";

import "./styles.css";

function App() {
  const [title, setTitle] = useState('')
  const [talk, setTalk] = useState('')
  const [repositories, setRepositories] = useState([])
  const [toggleTalk, setToggleTalk] = useState('')
  const [toggleCommentaries, setToggleCommentaries] = useState('')

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

  function handleShowCommentaryInput(id) {
    if (toggleTalk === '') {
      setToggleTalk(id)
    } else if (toggleTalk !== id) {
      setToggleTalk(id)
    } else {
      setToggleTalk('')
    }
  }

  async function handleAddCommentary(id) {
    const response = await api.post(`/commentaries/${id}`, {
      text: talk
    })
    setTalk('');
    if (response.status === 200) {
      listRepositories();
    }
  }

  function handleReadComments(id) {
    if (toggleCommentaries === '') {
      setToggleCommentaries(id)
    } else if (toggleCommentaries !== id) {
      setToggleCommentaries(id)
    }
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

              {/* mostrar campo de criar comentário */}
              { repository.id === toggleTalk 
                && 
                  <span>
                    <input 
                        type="text"
                        placeholder="Comente aqui."
                        value={talk}
                        onChange={(e)=>{setTalk(e.target.value)}}
                        style={{ padding:"9px", marginLeft: "5px" }}
                      />

                      <button onClick={() => {handleAddCommentary(repository.id)}}>
                        Comentar
                      </button>
                  </span>
                }

              {/* mostrar toggle de commntário */}
                <button onClick={() => {handleShowCommentaryInput(repository.id)}}>
                    {repository.id !== toggleTalk ? "Fazer" : "Ocutar"} Commentário
                </button>

              {/* mostrar opcao de ver comentários, se tiver */}
              { repository &&
                repository.talks && 
                repository.talks.length > 0 && 
                <button onClick={() => handleReadComments(repository.id)}>Ver comentários</button>
              }

              {/* lista de comentários caso click no botao acima */}
              { repository.id === toggleCommentaries && 
                <ol>
                  Commentários:
              {repository.talks.map((talk, index) => <li key={index}>{talk}</li>)}
                </ol>
              }

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
