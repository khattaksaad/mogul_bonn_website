import React, { useState, useEffect } from 'react';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if we already have a session
    const savedPassword = sessionStorage.getItem('adminPassword');
    if (savedPassword) {
      setPassword(savedPassword);
      fetchReservations(savedPassword);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    fetchReservations(password);
  };

  const fetchReservations = async (pass) => {
    setLoading(true);
    setError('');
    try {
      const response = await fetch('/api/get-reservations', {
        headers: {
          'Authorization': pass
        }
      });

      if (response.status === 401) {
        setError('Incorrect password');
        setLoading(false);
        setIsAuthenticated(false);
        sessionStorage.removeItem('adminPassword');
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch reservations');
      }

      const data = await response.json();
      setReservations(data);
      setIsAuthenticated(true);
      sessionStorage.setItem('adminPassword', pass);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAction = async (id, action) => {
    try {
      // We can use the same manage-reservation endpoint we built for the emails!
      const res = await fetch(`/api/manage-reservation?id=${id}&action=${action}`);
      if (res.ok) {
        // Refresh the list
        fetchReservations(password);
      } else {
        alert('Failed to update reservation');
      }
    } catch (err) {
      alert('Error updating reservation');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#fafaf5' }}>
        <form onSubmit={handleLogin} style={{ background: 'white', padding: '40px', borderRadius: '12px', boxShadow: '0 10px 25px rgba(0,0,0,0.05)', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ marginBottom: '20px', color: '#333' }}>Admin Dashboard</h2>
          {error && <p style={{ color: '#f44336', marginBottom: '15px' }}>{error}</p>}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid #ccc', borderRadius: '6px', fontSize: '16px', boxSizing: 'border-box' }}
            required
          />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '14px', background: '#d4af37', color: 'white', border: 'none', borderRadius: '6px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  return (
    <div style={{ padding: '60px 20px', maxWidth: '1200px', margin: '0 auto', minHeight: '80vh' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
        <h1 style={{ color: '#333', fontSize: '2.5rem', margin: 0 }}>Reservations</h1>
        <button 
          onClick={() => fetchReservations(password)}
          style={{ padding: '10px 20px', background: '#333', color: 'white', border: 'none', borderRadius: '6px', cursor: 'pointer', fontWeight: 'bold' }}
        >
          Refresh List
        </button>
      </div>

      <div style={{ overflowX: 'auto', background: 'white', borderRadius: '12px', boxShadow: '0 4px 15px rgba(0,0,0,0.05)' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', minWidth: '800px' }}>
          <thead>
            <tr style={{ background: '#f5f5f5', borderBottom: '2px solid #eaeaea' }}>
              <th style={{ padding: '20px', color: '#555', fontWeight: '600' }}>Date & Time</th>
              <th style={{ padding: '20px', color: '#555', fontWeight: '600' }}>Name</th>
              <th style={{ padding: '20px', color: '#555', fontWeight: '600' }}>Guests</th>
              <th style={{ padding: '20px', color: '#555', fontWeight: '600' }}>Contact</th>
              <th style={{ padding: '20px', color: '#555', fontWeight: '600' }}>Status</th>
              <th style={{ padding: '20px', color: '#555', fontWeight: '600' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {reservations.map(res => (
              <tr key={res.id} style={{ borderBottom: '1px solid #eaeaea' }}>
                <td style={{ padding: '20px' }}>
                  <strong style={{ fontSize: '1.1rem' }}>{res.date}</strong><br/>
                  <span style={{ color: '#777', fontSize: '0.95em' }}>{res.time}</span>
                </td>
                <td style={{ padding: '20px', fontWeight: '500', fontSize: '1.1rem' }}>{res.name}</td>
                <td style={{ padding: '20px', fontSize: '1.1rem' }}>{res.guests}</td>
                <td style={{ padding: '20px' }}>
                  {res.phone}<br/>
                  <span style={{ color: '#777', fontSize: '0.9em' }}>{res.email}</span>
                </td>
                <td style={{ padding: '20px' }}>
                  <span style={{ 
                    padding: '8px 14px', 
                    borderRadius: '20px', 
                    fontSize: '0.85em', 
                    fontWeight: 'bold',
                    background: res.status === 'Approved' ? '#e8f5e9' : res.status === 'Rejected' ? '#ffebee' : '#fff8e1',
                    color: res.status === 'Approved' ? '#2e7d32' : res.status === 'Rejected' ? '#c62828' : '#f57f17'
                  }}>
                    {res.status}
                  </span>
                </td>
                <td style={{ padding: '20px' }}>
                  {res.status === 'Pending' ? (
                    <div style={{ display: 'flex', gap: '10px' }}>
                      <button 
                        onClick={() => handleAction(res.id, 'approve')}
                        style={{ padding: '8px 16px', background: '#4CAF50', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9em', fontWeight: 'bold' }}
                      >
                        Approve
                      </button>
                      <button 
                        onClick={() => handleAction(res.id, 'reject')}
                        style={{ padding: '8px 16px', background: '#f44336', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontSize: '0.9em', fontWeight: 'bold' }}
                      >
                        Reject
                      </button>
                    </div>
                  ) : (
                    <span style={{ color: '#aaa', fontStyle: 'italic' }}>Processed</span>
                  )}
                </td>
              </tr>
            ))}
            {reservations.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#777', fontSize: '1.1rem' }}>
                  No reservations found yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Admin;
