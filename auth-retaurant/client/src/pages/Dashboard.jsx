import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user') || '{}');

  useEffect(() => {
    if (!user || !user.username) {
      navigate('/');
    }
  }, [navigate, user]);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    navigate('/');
  };

  return (
    <div className="dashboard-page">
      <header className="dashboard-header">
        <div className="dashboard-header-content">
          <div>
            <h1 className="dashboard-logo">TableReserve</h1>
          </div>
          <div className="dashboard-flex dashboard-align-center dashboard-space-x">
            <span className="dashboard-text-muted">Welcome, {user.full_name || user.username}</span>
            <button 
              onClick={handleLogout}
              className="dashboard-logout-btn"
            >
              Logout
            </button>
          </div>
        </div>
      </header>

      <div className="dashboard-main-content">
        <div className="dashboard-card">
          <h2 className="dashboard-welcome-text">
            Hello, {user.full_name || user.username}! 👋
          </h2>
          <p className="dashboard-subtitle">
            Welcome to your restaurant table reservation dashboard.
          </p>
        </div>

        <div className="dashboard-card">
          <h3 className="dashboard-card-title">Your Information</h3>
          <div className="user-info-row">
            <span className="user-info-label">Name:</span>
            <span className="user-info-value">{user.full_name}</span>
          </div>
          <div className="user-info-row">
            <span className="user-info-label">Username:</span>
            <span className="user-info-value">{user.username}</span>
          </div>
          <div className="user-info-row">
            <span className="user-info-label">Email:</span>
            <span className="user-info-value">{user.email}</span>
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="dashboard-card-title">Quick Actions</h3>
          <div className="dashboard-actions-grid">
            <button className="dashboard-action-btn dashboard-action-primary">
              Make Reservation
            </button>
            <button className="dashboard-action-btn dashboard-action-success">
              View Reservations
            </button>
            <button className="dashboard-action-btn dashboard-action-secondary">
              Edit Profile
            </button>
          </div>
        </div>

        <div className="dashboard-card">
          <h3 className="dashboard-card-title">Recent Reservations</h3>
          <div className="reservation-card">
            <div className="dashboard-flex dashboard-justify-between dashboard-align-center">
              <div>
                <h4 className="reservation-name">The Gourmet Spot</h4>
                <p className="reservation-details">January 15, 2024 at 7:00 PM • 4 guests</p>
              </div>
              <span className="status-badge status-confirmed">
                Confirmed
              </span>
            </div>
          </div>
          
          <div className="reservation-card">
            <div className="dashboard-flex dashboard-justify-between dashboard-align-center">
              <div>
                <h4 className="reservation-name">Seaside Bistro</h4>
                <p className="reservation-details">January 20, 2024 at 8:30 PM • 2 guests</p>
              </div>
              <span className="status-badge status-pending">
                Pending
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;