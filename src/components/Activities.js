
import { useEffect, useState } from 'react';

function getApiBaseUrl() {
  const codespace = process.env.CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api`;
  }
  return 'http://localhost:8000/api';
}

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(getApiBaseUrl() + '/activities/')
      .then(res => res.json())
      .then(data => {
        setActivities(data);
        setLoading(false);
      });
  }, []);

  return (
    <div className="card mt-4">
      <div className="card-header bg-warning text-dark">
        <h2 className="mb-0">Actividades</h2>
      </div>
      <div className="card-body">
        {loading ? (
          <div className="text-center">Cargando...</div>
        ) : (
          <table className="table table-striped table-bordered">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Usuario</th>
                <th>Tipo</th>
                <th>Duración</th>
                <th>Fecha</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity, idx) => (
                <tr key={activity._id || activity.id}>
                  <td>{idx + 1}</td>
                  <td>{activity.user && activity.user.name}</td>
                  <td>{activity.type}</td>
                  <td>{activity.duration} min</td>
                  <td>{activity.date}</td>
                  <td><button className="btn btn-info btn-sm">Ver</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <button className="btn btn-success">Agregar Actividad</button>
      </div>
    </div>
  );
}

export default Activities;
