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

  const repository = {id: uuid(),  title, techs, url, likes: 0, talks: [] };

  repositories.push(repository);
  
  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  const { id } = request.params;
  const {title, techs, url} = request.body;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({error : 'Repositorio não encontrado'});
  }

  const repository = {...repositories[repositoryIndex], id, title, techs, url};
  repositories[repositoryIndex] = repository;

  return response.json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  const {id} = request.params;
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({error : 'Projeto não encontrado'});
  }

  repositories.splice(repositoryIndex, 1);

  return response.status(204).send();
});

app.post("/repositories/:id/like", (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({error : 'Repositorio não encontrado'});
  }
  const { likes } = repositories[repositoryIndex];

  const repository = {...repositories[repositoryIndex], likes: likes +1};
  repositories[repositoryIndex] = repository;

  return response.json(repository)
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
  
  const repositoryIndex = repositories.findIndex(repository => repository.id === id);

  if (repositoryIndex < 0) {
    return response.status(400).json({error : 'Repositorio não encontrado'});
  }
  const {talks} = repositories[repositoryIndex];

  const repository = {...repositories[repositoryIndex], talks: talks.concat(text) };
  repositories[repositoryIndex] = repository;

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

  const repositoryIndex = repositories.findIndex(repository => repository.id === commentary.repository_id);

  const {talks} = repositories[repositoryIndex];
  
  const talkIndex = talks.findIndex(talk => talk === old_text);
  talks.splice(talkIndex, 1, text);

  const repository = {...repositories[repositoryIndex], talks: talks };
  
  repositories[repositoryIndex] = repository;
  commentaries[commentaryIndex] = commentary;

  return response.json(commentary)

});

module.exports = app;
