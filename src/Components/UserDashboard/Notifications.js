import React, { useState, useEffect, useCallback } from 'react';
import { Spinner } from 'react-bootstrap';
import { notificationService } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import { FaBell, FaTimes, FaCheck } from 'react-icons/fa';

const Notifications = ({ onCountChange }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchNotifications = useCallback(async () => {
    if (!user?.name) return;
    try {
      const res = await notificationService.getByUsername(user.name);
      const data = res.data || [];
      setNotifications(data);
      if (onCountChange) onCountChange(data.length);
    } catch (err) {
      console.error('Error fetching notifications:', err);
    } finally {
      setLoading(false);
    }
  }, [user?.name, onCountChange]);

  useEffect(() => {
    fetchNotifications();
  }, [fetchNotifications]);

  const handleDismiss = async (id) => {
    try {
      await notificationService.delete(id);
      setNotifications((prev) => {
        const next = prev.filter((n) => (n._id || n.id) !== id);
        if (onCountChange) onCountChange(next.length);
        return next;
      });
    } catch (err) {
      console.error('Error dismissing notification:', err);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Just now';
    const d = new Date(dateString);
    return isNaN(d) ? 'Recent' : d.toLocaleDateString(undefined, { month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="glass-card p-4 mb-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div className="d-flex align-items-center gap-2">
          <FaBell className="text-warning" size={20} />
          <div>
            <h5 className="text-white fw-bold mb-0">Direct Announcements</h5>
            <p className="text-secondary small mb-0">Alerts sent specifically to your workspace</p>
          </div>
        </div>
        <span className="badge-pill badge-high">{notifications.length} Alerts</span>
      </div>

      {loading ? (
        <div className="text-center py-3">
          <Spinner size="sm" animation="border" variant="primary" />
        </div>
      ) : notifications.length === 0 ? (
        <div className="text-center py-4 text-secondary small d-flex flex-column align-items-center gap-2">
          <FaCheck className="text-success" size={24} />
          <span>You are completely caught up! Zero unread notifications.</span>
        </div>
      ) : (
        <div className="d-flex flex-column gap-2">
          {notifications.map((item) => {
            const notifId = item._id || item.id;
            return (
              <div
                key={notifId}
                className="glass-card p-3 d-flex justify-content-between align-items-center gap-3 animate-fade-in"
                style={{ background: 'rgba(255, 255, 255, 0.02)', borderLeft: '3px solid #f59e0b' }}
              >
                <div>
                  <div className="text-white small fw-medium">{item.notificationText}</div>
                  <div className="text-muted small mt-1">
                    From: {item.sender || 'Project Lead'} · {formatDate(item.timestamp || item.createdAt)}
                  </div>
                </div>

                <button
                  onClick={() => handleDismiss(notifId)}
                  className="btn btn-sm btn-link text-secondary text-decoration-none p-1"
                  title="Dismiss notification"
                >
                  <FaTimes />
                </button>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Notifications;
