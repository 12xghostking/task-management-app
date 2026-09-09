import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { FaUserCheck, FaTasks, FaBell, FaSignOutAlt } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const UserHeader = ({ taskCount, notificationCount }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/login');
  };

  return (
    <div className="glass-card p-4 mb-4">
      <div className="d-flex flex-wrap justify-content-between align-items-center gap-3">
        <div className="d-flex align-items-center gap-3">
          <div
            style={{
              width: '52px',
              height: '52px',
              borderRadius: '50%',
              background: 'var(--accent-gradient)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#fff',
              fontSize: '1.4rem',
              fontWeight: 700,
              boxShadow: '0 4px 15px rgba(6, 182, 212, 0.35)',
            }}
          >
            {user?.name ? user.name.charAt(0).toUpperCase() : 'U'}
          </div>

          <div>
            <div className="d-flex align-items-center gap-2">
              <h3 className="text-white fw-bold mb-0">{user?.name || 'Team Member'}</h3>
              <span className="badge-pill badge-in-progress d-flex align-items-center gap-1">
                <FaUserCheck size={11} /> Active Contributor
              </span>
            </div>
            <p className="text-secondary small mb-0">{user?.email || 'Logged in workspace user'}</p>
          </div>
        </div>

        <div className="d-flex align-items-center gap-3">
          <div className="d-flex gap-2">
            <span className="badge-pill badge-pending d-flex align-items-center gap-1 py-2 px-3">
              <FaTasks className="text-primary" /> {taskCount || 0} Assigned Tasks
            </span>
            {notificationCount > 0 && (
              <span className="badge-pill badge-high d-flex align-items-center gap-1 py-2 px-3">
                <FaBell /> {notificationCount} Alerts
              </span>
            )}
          </div>

          <button onClick={handleSignOut} className="btn-modern-secondary py-2 px-3" style={{ fontSize: '0.85rem' }}>
            <FaSignOutAlt /> Sign Out
          </button>
        </div>
      </div>
    </div>
  );
};

export default UserHeader;
