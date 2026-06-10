import React, { useState, useEffect } from 'react';

import './Admin.css';

const Admin = () => {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const [filter, setFilter] = useState('All');
  const [timeFilter, setTimeFilter] = useState('All');

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
      console.error(err);
      alert('Error updating reservation');
    }
  };

  if (!isAuthenticated) {
    return (
      <div style={{ minHeight: '60vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: 'var(--ink)' }}>
        <form onSubmit={handleLogin} style={{ background: 'var(--ink-2)', padding: '40px', border: '1px solid var(--gold-border)', textAlign: 'center', maxWidth: '400px', width: '100%' }}>
          <h2 style={{ marginBottom: '20px', fontFamily: 'var(--font-serif)', color: 'var(--cream)', fontSize: 'var(--fs-h3)', fontWeight: 400 }}>Admin Login</h2>
          {error && <p style={{ color: 'var(--gold)', marginBottom: '15px', fontFamily: 'var(--font-sans)', fontSize: '0.9rem' }}>{error}</p>}
          <input
            type="password"
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: '100%', padding: '12px', marginBottom: '20px', border: '1px solid var(--gold-border)', background: 'var(--ink)', color: 'var(--cream)', fontSize: '16px', boxSizing: 'border-box', fontFamily: 'var(--font-sans)', outline: 'none' }}
            required
          />
          <button type="submit" disabled={loading} className="btn btn-gold" style={{ width: '100%', justifyContent: 'center' }}>
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    );
  }

  const filteredReservations = reservations.filter(res => {
    const statusMatch = filter === 'All' || res.status === filter;
    
    let timeMatch = true;
    if (timeFilter !== 'All' && res.date) {
      const resDate = new Date(res.date);
      if (!isNaN(resDate.getTime())) {
        const today = new Date();
        today.setHours(0,0,0,0);
        const resDay = new Date(resDate);
        resDay.setHours(0,0,0,0);

        if (timeFilter === 'Today') {
          timeMatch = resDay.getTime() === today.getTime();
        } else if (timeFilter === 'This Week') {
          const nextWeek = new Date(today);
          nextWeek.setDate(today.getDate() + 7);
          timeMatch = resDay >= today && resDay <= nextWeek;
        } else if (timeFilter === 'This Month') {
          timeMatch = resDay.getMonth() === today.getMonth() && resDay.getFullYear() === today.getFullYear();
        }
      }
    }

    return statusMatch && timeMatch;
  });

  return (
    <div className="admin-container">
      <div className="admin-header">
        <h1 className="admin-title">Reservations</h1>
        <div className="admin-controls">
          <select 
            value={timeFilter} 
            onChange={(e) => setTimeFilter(e.target.value)}
            className="admin-select"
          >
            <option value="All">All Dates</option>
            <option value="Today">Today</option>
            <option value="This Week">Next 7 Days</option>
            <option value="This Month">This Month</option>
          </select>
          <select 
            value={filter} 
            onChange={(e) => setFilter(e.target.value)}
            className="admin-select"
          >
            <option value="All">All Statuses</option>
            <option value="Pending">Pending</option>
            <option value="Approved">Approved</option>
            <option value="Rejected">Rejected</option>
          </select>
          <button 
            onClick={() => fetchReservations(password)}
            className="btn btn-outline" style={{ padding: '8px 20px' }}
          >
            Refresh
          </button>
        </div>
      </div>

      <div className="admin-table-wrapper">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Date & Time</th>
              <th>Name</th>
              <th>Guests</th>
              <th>Contact</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredReservations.map(res => (
              <tr key={res.id}>
                <td data-label="Date & Time">
                  <strong style={{ fontSize: '1.1rem', fontWeight: 500 }}>{res.date}</strong><br/>
                  <span style={{ color: 'var(--cream-dim)', fontSize: '0.95em' }}>{res.time}</span>
                </td>
                <td data-label="Name" style={{ fontWeight: 500, fontSize: '1.1rem' }}>{res.name}</td>
                <td data-label="Guests" style={{ fontSize: '1.1rem' }}>{res.guests}</td>
                <td data-label="Contact">
                  {res.phone}<br/>
                  <span style={{ color: 'var(--cream-dim)', fontSize: '0.9em' }}>{res.email}</span>
                </td>
                <td data-label="Status">
                  <span style={{ 
                    padding: '6px 12px', 
                    fontSize: '0.75rem',
                    fontFamily: 'var(--font-display)',
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    border: '1px solid',
                    borderColor: res.status === 'Approved' ? '#2e7d32' : res.status === 'Rejected' ? '#c62828' : 'var(--gold)',
                    color: res.status === 'Approved' ? '#2e7d32' : res.status === 'Rejected' ? '#c62828' : 'var(--gold)'
                  }}>
                    {res.status}
                  </span>
                </td>
                <td data-label="Actions">
                  {res.status === 'Pending' ? (
                    <div className="admin-actions">
                      <button onClick={() => handleAction(res.id, 'approve')} className="btn-approve">Approve</button>
                      <button onClick={() => handleAction(res.id, 'reject')} className="btn-reject">Reject</button>
                      <button onClick={() => { if(window.confirm('Are you sure you want to delete this reservation?')) handleAction(res.id, 'delete') }} className="btn-delete">Delete</button>
                    </div>
                  ) : (
                    <div className="admin-actions" style={{ alignItems: 'center' }}>
                      <span style={{ color: 'var(--cream-dim)', opacity: 0.5, fontFamily: 'var(--font-display)', fontSize: '0.8rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Processed</span>
                      <button onClick={() => { if(window.confirm('Are you sure you want to delete this reservation?')) handleAction(res.id, 'delete') }} className="btn-delete-small">Delete</button>
                    </div>
                  )}
                </td>
              </tr>
            ))}
            {filteredReservations.length === 0 && (
              <tr>
                <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: 'var(--cream-dim)', fontSize: '1.1rem', fontStyle: 'italic', fontFamily: 'var(--font-serif)' }}>
                  No reservations found for this filter.
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
