
import { useEffect, useState } from 'react';

function getApiBaseUrl() {
  const codespace = process.env.CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api`;
  }
  return 'http://localhost:8000/api';
}

function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getApiBaseUrl() + '/leaderboard/')
      .then(res => res.json())
      .then(data => {
        setLeaderboard(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card mt-4">
      <div className="card-header bg-info text-white">
        <h2 className="mb-0">Leaderboard</h2>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="text-center">Cargando...</div>
        ) : (
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Equipo</th>
                <th>Puntos</th>
              </tr>
            </thead>
            <tbody>
              {leaderboard.map((entry, idx) => (
                <tr key={entry._id || entry.id}>
                  <td>{idx + 1}</td>
                  <td>{entry.team && entry.team.name}</td>
                  <td>{entry.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Leaderboard;
