
function getApiBaseUrl() {
  const codespace = process.env.CODESPACE_NAME;
  if (codespace) {
    return `https://${codespace}-8000.app.github.dev/api`;
  }
  return 'http://localhost:8000/api';
}

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', team: '' });
  const [teams, setTeams] = useState([]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch(getApiBaseUrl() + '/users/')
      .then(res => res.json())
      .then(data => {
        setUsers(data);
        setLoading(false);
      });
    fetch(getApiBaseUrl() + '/teams/')
      .then(res => res.json())
      .then(data => setTeams(data));
  }, [saving]);

  const handleShowModal = () => {
    setForm({ name: '', email: '', team: '' });
    setError('');
    setShowModal(true);
  };
  const handleCloseModal = () => setShowModal(false);

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = e => {
    e.preventDefault();
    setSaving(true);
    setError('');
    fetch(getApiBaseUrl() + '/users/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        team_id: form.team,
        is_superhero: false
      })
    })
      .then(res => {
        if (!res.ok) return res.json().then(err => { throw err; });
        return res.json();
      })
      .then(() => {
        setShowModal(false);
        setSaving(false);
      })
      .catch(err => {
        setError(err.detail || 'Error al guardar');
        setSaving(false);
      });
  };

  return (
    <div className="card mt-4">
      <div className="card-header bg-primary text-white d-flex justify-content-between align-items-center">
        <h2 className="mb-0">Usuarios</h2>
        <button className="btn btn-success" onClick={handleShowModal}>Agregar Usuario</button>
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
                <th>Email</th>
                <th>Equipo</th>
                <th>Acción</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user, idx) => (
                <tr key={user._id || user.id}>
                  <td>{idx + 1}</td>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.team && user.team.name}</td>
                  <td><button className="btn btn-info btn-sm">Ver</button></td>
                </tr>
              ))}
            </tbody>
          </table>
        )}

        {/* Modal Bootstrap */}
        {showModal && (
          <div className="modal show fade d-block" tabIndex="-1" role="dialog" style={{ background: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog" role="document">
              <div className="modal-content">
                <div className="modal-header">
                  <h5 className="modal-title">Agregar Usuario</h5>
                  <button type="button" className="btn-close" onClick={handleCloseModal}></button>
                </div>
                <form onSubmit={handleSubmit}>
                  <div className="modal-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    <div className="mb-3">
                      <label className="form-label">Nombre</label>
                      <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Email</label>
                      <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
                    </div>
                    <div className="mb-3">
                      <label className="form-label">Equipo</label>
                      <select className="form-select" name="team" value={form.team} onChange={handleChange} required>
                        <option value="">Selecciona un equipo</option>
                        {teams.map(team => (
                          <option key={team._id || team.id} value={team._id || team.id}>{team.name}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" onClick={handleCloseModal}>Cancelar</button>
                    <button type="submit" className="btn btn-primary" disabled={saving}>{saving ? 'Guardando...' : 'Guardar'}</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Users;
