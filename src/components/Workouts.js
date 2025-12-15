
import { useEffect, useState } from 'react';

function getApiBaseUrl() {
  const codespace = process.env.CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api`;
  }
  return 'http://localhost:8000/api';
}

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getApiBaseUrl() + '/workouts/')
      .then(res => res.json())
      .then(data => {
        setWorkouts(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card mt-4">
      <div className="card-header bg-secondary text-white">
        <h2 className="mb-0">Workouts</h2>
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
                <th>Sugerido para</th>
              </tr>
            </thead>
            <tbody>
              {workouts.map((workout, idx) => (
                <tr key={workout._id || workout.id}>
                  <td>{idx + 1}</td>
                  <td>{workout.name}</td>
                  <td>{workout.description}</td>
                  <td>{workout.suggested_for && workout.suggested_for.map(t => t.name).join(', ')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
}

export default Workouts;
