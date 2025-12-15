
import { useEffect, useState } from 'react';

function getApiBaseUrl() {
  const codespace = process.env.CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api`;
  }
  return 'http://localhost:8000/api';
}

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getApiBaseUrl() + '/teams/')
      .then(res => res.json())
      .then(data => {
        setTeams(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card mt-4">
      <div className="card-header bg-success text-white">
        <h2 className="mb-0">Equipos</h2>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="text-center">Cargando...</div>
        ) : (
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Descripción</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {teams.map((team, idx) => (
                <tr key={team._id || team.id}>
                  <td>{idx + 1}</td>
                  <td>{team.name}</td>
                  <td>{team.description}</td>
                  <td><button className="btn btn-info btn-sm">Ver</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button className="btn btn-success">Agregar Equipo</button>
      </div>
    </div>
  );
}

export default Teams;
