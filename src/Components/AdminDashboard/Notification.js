import React, { useState, useEffect } from 'react';
import { Form, Spinner, Alert } from 'react-bootstrap';
import { notificationService, userService } from '../../services/api';
import { FaPaperPlane, FaBell } from 'react-icons/fa';

const Notification = () => {
  const [notificationText, setNotificationText] = useState('');
  const [recipient, setRecipient] = useState('');
  const [users, setUsers] = useState([]);
  const [sending, setSending] = useState(false);
  const [success, setSuccess] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    userService
      .getUsers()
      .then((res) => {
        if (isMounted) setUsers(res.data || []);
      })
      .catch((err) => console.error('Error fetching users:', err));

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!notificationText || !recipient) {
      setError('Please provide a recipient and notification text.');
      return;
    }

    setSending(true);
    try {
      await notificationService.create({
        recipient,
        notificationText,
      });

      setSuccess(`Notification dispatched to ${recipient}!`);
      setNotificationText('');
      setRecipient('');
    } catch (err) {
      setError(err.response?.data?.message || 'Error dispatching notification.');
    } finally {
      setSending(false);
    }
  };

  return (
    <div className="glass-card p-4 mb-4 h-100">
      <div className="d-flex align-items-center gap-2 mb-3">
        <FaBell className="text-warning" size={22} />
        <div>
          <h5 className="text-white fw-bold mb-0">Dispatch Notification</h5>
          <p className="text-secondary small mb-0">Broadcast messages directly to team member inboxes</p>
        </div>
      </div>

      {success && (
        <Alert variant="success" className="py-2 small border-0 text-white" style={{ background: 'rgba(16, 185, 129, 0.2)' }}>
          {success}
        </Alert>
      )}

      {error && (
        <Alert variant="danger" className="py-2 small border-0 text-white" style={{ background: 'rgba(239, 68, 68, 0.2)' }}>
          {error}
        </Alert>
      )}

      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Select Recipient</Form.Label>
          <Form.Select
            className="modern-input"
            value={recipient}
            onChange={(e) => setRecipient(e.target.value)}
            required
          >
            <option value="">Choose a recipient...</option>
            <option value="All">📢 All Team Members (Broadcast)</option>
            {users.map((user) => (
              <option key={user._id || user.id} value={user.name}>
                {user.name} ({user.email})
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Message Body</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            className="modern-input"
            placeholder="e.g. Please update the sprint review deck before 4 PM today..."
            value={notificationText}
            onChange={(e) => setNotificationText(e.target.value)}
            required
          />
        </Form.Group>

        <button
          type="submit"
          className="btn-modern-primary w-100 py-2"
          disabled={sending || !notificationText || !recipient}
        >
          {sending ? (
            <>
              <Spinner size="sm" animation="border" /> Sending...
            </>
          ) : (
            <>
              <FaPaperPlane /> Dispatch Notification
            </>
          )}
        </button>
      </Form>
    </div>
  );
};

export default Notification;
