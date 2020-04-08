import React, { useState, useEffect } from 'react';
import api from "./services/api";

import './App.css';
// import back from './assets/img.jpeg';

import Header from './components/Header'

export default function App () {
  const [projects, setProjects] = useState([])
  
  useEffect(()=>{
    api.get("/projects").then(response => response.data).then(data => setProjects(data))
  }, [])

  async function handleAddProject() {
    // setProjects(projects.concat(`Novo projeto ${Date.now()}`))
    // setProjects([...projects, `Novo projeto ${Date.now()}`])

    const response = await api.post('projects', {
      title: `Novo projeto ${Date.now()}`,
      owner: 'Thiago Dantas',
    });

    const project = response.data;

    setProjects([...projects, project]);
  }

  return (
    <>
      <Header title="Projects"></Header>
      {/* <img src={back} alt=""/> */}
      <ul>
        {projects.map((project, index) => <li key={project.id}>{project.title}</li>)}
      </ul>
      <button type="button" onClick={handleAddProject}>Add project</button>
    </>
  )
}