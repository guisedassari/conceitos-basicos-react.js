import React, { useState, useEffect }from "react";
import api from "./services/api"

import "./styles.css";

function App() {
  const [repositories, setRepositores] = useState([]);

  useEffect(() => {
    api.get('repositories').then(response => {
      setRepositores(response.data);
    });
  }, []);

  async function handleAddRepository() {

    const response = await api.post('repositories', {
      title: `Novo Repository ${new Date()}`,
      url: "https://github.com/guisedassari/layout-react",
      techs: [
        "ReactJs"
      ]
    });
    setRepositores([...repositories, response.data]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`).then((response) => {
      const repoIndex = repositories.findIndex(repo => repo.id === id);
      repositories.splice(repoIndex, 1);
    })


    setRepositores([...repositories]);
  }

  return (
    <div>
      <ul data-testid="repository-list">
        {
          repositories.map(repository => {
            return (
              <li key={repository.id}>
                {repository.title}

                <button onClick={() => handleRemoveRepository(repository.id)}>
                  Remover
								</button>
              </li>
            )

          })
        }

      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
