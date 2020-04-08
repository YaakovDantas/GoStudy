const express = require("express");
const cors = require("cors");

const { uuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];
const commentaries = [];

// Repositories Routes

app.get("/repositories", (request, response) => {
  return response.json(repositories);
});

app.post("/repositories", (request, response) => {
  const {title, techs, url} = request.body;

  const repositorie = {id: uuid(),  title, techs, url, likes: 0, talks: [] };

  repositories.push(repositorie);
  
  return response.json(repositorie);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, techs, url} = request.body;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorieIndex < 0) {
    return response.status(400).json({error : 'Repositorio não encontrado'});
  }

  const repositorie = {...repositories[repositorieIndex], id, title, techs, url};
  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie)

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorieIndex < 0) {
    return response.status(400).json({error : 'Projeto não encontrado'});
  }

  repositories.splice(repositorieIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorieIndex < 0) {
    return response.status(400).json({error : 'Repositorio não encontrado'});
  }
  const { likes } = repositories[repositorieIndex];

  const repositorie = {...repositories[repositorieIndex], likes: likes +1};
  repositories[repositorieIndex] = repositorie;

  return response.json(repositorie)
});

// Commentaries Routes

app.get("/commentaries", (request, response) => {
  const {filter} = request.query;
  
  const result = filter ? commentaries.filter(commentary => commentary.repository_id === filter) : commentaries;
  
  return response.json(result);
});

app.post("/commentaries/:id", (request, response) => {
  const {text} = request.body;
  const { id } = request.params;
  
  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === id);

  if (repositorieIndex < 0) {
    return response.status(400).json({error : 'Repositorio não encontrado'});
  }
  const {talks} = repositories[repositorieIndex];

  const repositorie = {...repositories[repositorieIndex], talks: talks.concat(text) };
  repositories[repositorieIndex] = repositorie;

  const commentary = {id: uuid(), repository_id: id, text };

  commentaries.push(commentary);
  
  return response.json(commentary);
});

app.put("/commentaries/:id", (request, response) => {
  const { id } = request.params;
  const {text} = request.body;

  const commentaryIndex = commentaries.findIndex(commentary => commentary.id === id);

  if (commentaryIndex < 0) {
    return response.status(400).json({error : 'Comentário não encontrado'});
  }
  const old_text = commentaries[commentaryIndex].text;

  const commentary = {...commentaries[commentaryIndex], text};

  const repositorieIndex = repositories.findIndex(repositorie => repositorie.id === commentary.repository_id);

  const {talks} = repositories[repositorieIndex];
  
  const talkIndex = talks.findIndex(talk => talk === old_text);
  talks.splice(talkIndex, 1, text);

  const repositorie = {...repositories[repositorieIndex], talks: talks };
  
  repositories[repositorieIndex] = repositorie;
  commentaries[commentaryIndex] = commentary;

  return response.json(commentary)

});

module.exports = app;
