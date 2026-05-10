// frontend/src/App.js
import React, { useState, useEffect } from 'react';
 
// Read backend URL from environment variable (set differently per environment)
// Falls back to localhost for local development
const API = process.env.REACT_APP_API_URL || 'http://localhost:5000';
 
function App() {
  const [students, setStudents] = useState([]);
  const [form, setForm]         = useState({ name: '', regNo: '', grade: '' });
  const [loading, setLoading]   = useState(false);
  const [message, setMessage]   = useState('');
 
  // Fetch all students when component mounts
  useEffect(() => {
    fetchStudents();
  }, []);
 
  const fetchStudents = async () => {
    try {
      const res = await fetch(`${API}/api/students`);
      const data = await res.json();
      setStudents(data);
    } catch (err) {
      setMessage('Cannot connect to backend.');
    }
  };
 
  const addStudent = async () => {
    if (!form.name || !form.regNo) {
      setMessage('Name and Reg No are required.');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(`${API}/api/students`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });
      if (res.ok) {
        setForm({ name: '', regNo: '', grade: '' });
        setMessage('Student added!');
        fetchStudents();
      } else {
        const err = await res.json();
        setMessage(err.error || 'Error adding student.');
      }
    } catch {
      setMessage('Network error.');
    }
    setLoading(false);
  };
 
  return (
    <div style={{ maxWidth: 700, margin: '2rem auto', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#1F3864' }}>Student Records — DevOps CS316</h1>
      <p>Environment: {process.env.NODE_ENV || 'development'}</p>
      {message && <p style={{ color: 'red' }}>{message}</p>}
      <div style={{ display: 'flex', gap: 8, marginBottom: 16 }}>
        {['name','regNo','grade'].map(f => (
          <input key={f} placeholder={f} value={form[f]}
            onChange={e => setForm({...form, [f]: e.target.value})}
            style={{ flex: 1, padding: 8, border: '1px solid #ccc' }} />
        ))}
        <button onClick={addStudent} disabled={loading}
          style={{ padding: '8px 16px', background: '#2E75B6', color: 'white', border: 'none' }}>
          {loading ? '...' : 'Add'}
        </button>
      </div>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead><tr style={{ background: '#DEEAF1' }}>
          {['Name','Reg No','Grade','Course'].map(h => (
            <th key={h} style={{ padding: 8, border: '1px solid #ccc', textAlign: 'left' }}>{h}</th>
          ))}
        </tr></thead>
        <tbody>{students.map(s => (
          <tr key={s._id}>
            {[s.name, s.regNo, s.grade, s.course].map((v,i) => (
              <td key={i} style={{ padding: 8, border: '1px solid #eee' }}>{v}</td>
            ))}
          </tr>
        ))}</tbody>
      </table>
    </div>
  );
}
 
export default App;
